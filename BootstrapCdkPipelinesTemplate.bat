set CDK_NEW_BOOTSTRAP=1

npx cdk bootstrap -v --profile SharedServicesAccountProfile ^
    --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess ^
    --qualifier cis-pipe ^
    --template bootstrap.yaml ^
    aws://SharedServicesAccountId/eu-west-1 > bootstrap.log.txt 2>&1 && ^
npx cdk bootstrap --profile DeploymentAccountOneProfile ^
    --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess ^
    --trust SharedServicesAccountId ^
    --qualifier cis-pipe ^
    --template bootstrap.yaml ^
    aws://DeploymentAccountOneId/eu-west-1 >> bootstrap.log.txt 2>&1 && ^
npx cdk bootstrap --profile DeploymentAccountTwoProfile ^
    --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess ^
    --trust SharedServicesAccountId ^
    --qualifier cis-pipe ^
    --template bootstrap.yaml ^
    aws://DeploymentAccountTwoId/eu-west-1 >> bootstrap.log.txt 2>&1



pause