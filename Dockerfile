FROM emscripten/emsdk:3.1.51

RUN apt-get update \
 && apt-get install --no-install-recommends -y \
    build-essential cmake git ragel \
    patch libtool itstool pkg-config \
    python3 python3-ply gettext autopoint \
    automake autoconf m4 gperf \
    licensecheck gawk \
 && apt-get clean autoclean -y \
 && apt-get autoremove -y \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /code

CMD ["make"]
