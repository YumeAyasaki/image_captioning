docker-compose rm -f
docker-compose pull
docker-compose up --force-recreate --build -d
docker image prune -f
# Run some tests
./tests
docker-compose stop -t 1

#docker container ls -a
#docker container rm