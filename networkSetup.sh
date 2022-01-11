echo("=======================Cleaning previous network==========================")
./network.sh down 
 docker volume prune
 docker system prune
 docker network prune
 
 
 echo("================Network up, Create channel & CC deploy===================")
 ./network.sh up -ca -s couchdb
 
  echo("====================Create channel ondc=================================")
 ./network.sh createChannel -c ondc
 
  echo("===================Deploying Chaincodes=================================")
 ./network.sh deployCC -ccn basic-product -ccp ../asset-transfer-basic/Chaincode-product -ccl go -c ondc 
 ./network.sh deployCC -ccn basic-order -ccp ../asset-transfer-basic/Chaincode-order/ -ccl go -c ondc 
 ./network.sh deployCC -ccn basic-agg -ccp ../asset-transfer-basic/Chaincode-aggregated -ccl go -c ondc 

