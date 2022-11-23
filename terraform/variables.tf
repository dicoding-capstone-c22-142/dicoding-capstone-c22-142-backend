variable "env" {
    description = "Environment"
    type        = string
    default     = "dev"
  
}

variable "aws_region" {
    description = "AWS Region"
    type        = string
    default     = "ap-southeast-1"
}

variable "aws_profile" {
    description = "AWS Profile"
    type        = string
    default     = "ftr-infra"
}
variable "profile" {
    description = "AWS Profile"
    type        = string
    default     = "**"
}

variable "service_name" {
    description = "Service Name"
    type        = string
    default     = "cashtex"
}