root := justfile_directory()
docker_dir := join(root, "docker")

bold := '$(tput bold)'
normal := '$(tput sgr0)'

@build-image image="ss-frontend:latest":
    echo "{{bold}}Building docker image with name {{image}}.{{normal}}"
    docker build . -t {{image}} -f {{docker_dir}}/Dockerfile

@run-image image="ss-frontend:latest" *run_args="": (build-image image)
    echo "{{bold}}Running docker image with name {{image}}.{{normal}}"
    docker run --rm -p "8157:80" {{run_args}} {{image}}
