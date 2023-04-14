
NAME=postgres-local
PORT=5432

if [[ "$(docker images -q $NAME 2> /dev/null)" == "" ]]; then # if no image, then build new image
    echo 'Docker: Building new image for ' $NAME
    docker build .. -f ./scripts/Dockerfile.postgres -t postgres-local
fi

if [ ! "$(docker ps -a -q -f name=$NAME)" ] # if container not exist, then create new container
then
    echo "Docker: Creating container"
    docker run --name $NAME -p $PORT:5432 $NAME
else
    if [ "$(docker ps -aq -f status=exited -f name=$NAME)" ]; then # if container exist but instance stopped, then start instance
        echo "Docker: Starting container"
        docker start -a $NAME
    fi
fi