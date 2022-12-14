import boto3
import json
from custom_encoder import CustomEncoder
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodbTableName = 'cashtex-user'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(dynamodbTableName)

getMethod = 'GET'
postMethod = 'POST'
patchMethod = 'PATCH'
deleteMethod = 'DELETE'
healthPath = '/health'
userPath = '/user'
usersPath = '/users'

def lambda_handler(event, context):
    logger.info(event)
    httpMethod = event['httpMethod']
    path = event['path']
    if httpMethod == getMethod and path == healthPath:
        response = buildResponse(200)
    elif httpMethod == getMethod and path == userPath:
        response = getUser(event['queryStringParameters']['user_id'])
    elif httpMethod == getMethod and path == usersPath:
        response = getUsers()
    elif httpMethod == postMethod and path == userPath:
        response = saveUser(json.loads(event['body']))
    elif httpMethod == patchMethod and path == userPath:
        requestBody = json.loads(event['body'])
        response = modifyUser(requestBody['user_id'], requestBody['update_key'], requestBody['update_value'])
    elif httpMethod == deleteMethod and path == userPath:
        requestBody = json.loads(event['body'])
        response = deleteUser(requestBody['user_id'])
    else:
        response = buildResponse(404, 'Not Found')

    return response

def getUser(user_id):
    try:
        response = table.get_item(
            Key={
                'user_id': user_id
            }
        )
        if 'Item' in response:
            return buildResponse(200, response['Item'])
        else:
            return buildResponse(404, {'Message': 'User_Id: %s not found' % user_id})
    except:
        logger.exception('Make sure that user is allready registred')

def getUsers():
    try:
        response = table.scan()
        result = response['Items']

        while 'LastEvaluatedKey' in response:
            response = table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            result.extend(response['Items'])

        body = {
            'users': result
        }
        return buildResponse(200, body)

    except:
        logger.exception('Successfully loaded')

def saveUser(requestBody):
    try:
        table.put_item(Item=requestBody)
        body = {
            'Operation': 'SAVE',
            'Message': 'SUCCESS',
            'Item': requestBody
        }
        return buildResponse(200, body)
    except:
        logger.exception('Successfully added')

def modifyUser(user_id, update_key, update_value):
    try:
        response = table.update_item(
            Key={
                'user_id': user_id
            },
            UpdateExpression='set %s = :value' % update_key,
            ExpressionAttributeValues={
                ':value': update_value
            },
            ReturnVlues='UPDATED_NEW'
        )
        body = {
            'Operation': 'UPDATE',
            'Message': 'SUCCESS',
            'UpdatedAttributes': response
        }
        return buildResponse(200, body)
    except:
        logger.exception('Successfuly modified')

def deleteUser(user_id):
    try:
        response = table.delete_item(
            Key={
                'user_id': user_id
            },
            ReturnValues='ALL_OLD'
        )
        body = {
            'Operation': 'DELETE',
            'Message': 'SUCCESS',
            'deletedItem': response
        }
        return buildResponse(200, body)
    except:
        logger.exception('Successfully deleted')

def buildResponse(statusCode, body=None):        
        response = {
            'statusCode': statusCode,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
        if body is not None:
            response['body'] = json.dumps(body, cls=CustomEncoder)
        return response