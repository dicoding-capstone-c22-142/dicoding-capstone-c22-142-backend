terraform {
  required_version = "1.3.5"
}

provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile

  default_tags {
    tags = {
      Environment = var.env
      Project   = "Cashtex-API"
      CreatedAt = "2022-11-23"
      ManagedBy = "Terraform"
      Owner     = "Dicoding Capstone C22-142 Team"
    }
  }
}