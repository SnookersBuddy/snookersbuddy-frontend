root := justfile_directory()
docker_dir := join(root, "docker")

bold := '$(tput bold)'
normal := '$(tput sgr0)'

image := "snookersbuddy/snookersbuddy-frontend:local"

backend_host := "backend:28080"
backend_network := "snookersbuddy-local"

@help:
    echo "The following args can be overwritten via just variables."
    echo "{{bold}}image{{normal}} - the image name (optional)"
    echo "{{bold}}backend_host{{normal}} - the backend host (optional)"
    echo "{{bold}}backend_network{{normal}} - the container runtime network used to connect to the backend host (optional) (not needed when backend is running in host network)"
    echo "\n{{bold}}Usage{{normal}}: just image=... <recipe-name>\n"
    just --list

@build-image:
    echo "{{bold}}Building docker image with name {{image}}.{{normal}}"
    docker build . -t {{image}} -f {{docker_dir}}/Dockerfile

run-image *run_args="": build-image
    #!/usr/bin/env sh
    echo "{{bold}}Running docker image with name {{image}}.{{normal}}"

    # Create bridged network for communication to potential containerised backend.
    docker network inspect snookersbuddy-local >/dev/null 2>&1
    if [ ! $? -eq 0 ] ; then
        echo "{{bold}}Creating bridged network "snookersbuddy-local".{{normal}}"
        docker network create --driver bridge snookersbuddy-local
    fi

    echo "{{bold}}Using backend host {{backend_host}}.{{normal}}"

    docker run --rm -p "8157:80" --network={{backend_network}} -e "BACKEND_HOST={{backend_host}}" {{run_args}} {{image}}

default: help