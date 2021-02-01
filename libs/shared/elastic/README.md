# elastic

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test elastic` to execute the unit tests via [Jest](https://jestjs.io).

---

## Setup

### [Docker][3]

1. **Install Docker**

    `brew cask install docker-edge`

2. **Check if the Docker is up and running**

    ```sh
    $ docker --version

    Docker version 20.10.0-rc2, build dca98e3
    ```

3. **Pull the Elasticsearch Docker image**

    ```sh
    $ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.10.2

    7.10.2: Pulling from elasticsearch/elasticsearch
    ddf49b9115d7: Pull complete 
    e736878e27ad: Pull complete 
    7487c9dcefbe: Pull complete 
    9ccb7e6e1f0c: Pull complete 
    dcec6dec98db: Pull complete 
    8a10b4854661: Pull complete 
    1e595aee1b7d: Pull complete 
    06cc198dbf22: Pull complete 
    55b9b1b50ed8: Pull complete 
    Digest: sha256:d528cec81720266974fdfe7a0f12fee928dc02e5a2c754b45b9a84c84695bfd9
    Status: Downloaded newer image for docker.elastic.co/elasticsearch/elasticsearch:7.10.2
    docker.elastic.co/elasticsearch/elasticsearch:7.10.2
    ```

4. **Run Elasticsearch on a single node cluster**

    ```sh
    docker run -d --rm -p 9200:9200 --name elasticsearch_7_10_2 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.10.2
    ```

5. **Check if the Elasticsearch container is up and running**

    ```sh
    $ curl -X GET 'localhost:9200/_cat/nodes?v=true'

    ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role  master name
    172.17.0.2           22          96   0    0.00    0.01     0.00 cdhilmrstw *      5160ddd7a72b
    ```

6. **Shutdown the Elasticsearch container**

    ```sh
    docker container stop elasticsearch_7_10_2
    ```

7. **References**

   - [Get Started with Docker][1]
   - [Install Elasticsearch with Docker][2]

[1]: https://www.docker.com/
[2]: https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
[3]: https://docs.docker.com/get-docker/

## Homebrew

1. **Check the latest elasticsearch version**

    ```sh
      $ brew info elasticsearch

      elasticsearch: stable 7.10.2 (bottled)
      Distributed search & analytics engine
      https://www.elastic.co/products/elasticsearch
      Deprecated because it is switching to an incompatible license!
      Not installed
      From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/elasticsearch.rb
      License: Apache-2.0
      
      ==> Dependencies
      Build: gradle ✘
      Required: openjdk ✘
      
      ==> Caveats
      Data:    /usr/local/var/lib/elasticsearch/
      Logs:    /usr/local/var/log/elasticsearch/elasticsearch_roalcantara.log
      Plugins: /usr/local/var/elasticsearch/plugins/
      Config:  /usr/local/etc/elasticsearch/

      To have launchd start elasticsearch now and restart at login:
        brew services start elasticsearch
      Or, if you don't want/need a background service you can just run:
        elasticsearch
    ```

2. **Install Elasticsearch**

    ```sh
    brew install elasticsearch
    ```

3. **Start the Elasticsearch service**

    ```sh
    brew services start elasticsearch
    ```

4. **Check if Elasticsearch is up and running**

    ```sh
    $ curl -X GET 'localhost:9200/_cat/nodes?v=true'

    ip         heap.percent ram.percent cpu load_1m load_5m load_15m node.role  master name
    172.17.0.2           22          96   0    0.00    0.01     0.00 cdhilmrstw *      5160ddd7a72b
    ```

5. **Stop the Elasticsearch service**

    ```sh
    brew services stop elasticsearch
    ```

---

## Quickstart

### cURL

1. [**CREATE a document**](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html)

    ```sh
    curl -X POST http://localhost:9200/pokemons/_doc/100 \
      --header 'content-type: application/json' \
      --data '{"code": 100,"name": "soundproof","height": 5,"weight": 104,"created_at": "2021-02-04T13:31:42.843787"}'
    ```

2. [**GET documents**](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html)

    ```sh
    curl http://localhost:9200/pokemons/_search
    ```

3. [**GET documents by term**](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html)

    ```sh
    curl -X POST http://localhost:9200/pokemons/_search \
      --header 'content-type: application/json' \
      --data '{"query": {"term": {"code": 100}}}'
    ```

4. [**GET document by id**](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html)

    ```sh
    curl http://localhost:9200/pokemons/_doc/100
    ```

5. [**DELETE document by id**](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html)

    ```sh
    curl -X DELETE http://localhost:9200/pokemons/_doc/100
    ```

6. [**GET all running nodes**](https://www.elastic.co/guide/en/elasticsearch/reference/current/cat-nodes.html)

    ```sh
    curl 'http://localhost:9200/_cat/nodes?v=true'
    ```

7. [**GET an index's mapping**](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping.html)

    ```sh
    curl http://localhost:9200/_mapping
    ```

8. [**DELETE an index**](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html)

    ```sh
    curl -X DELETE http://localhost:9200/pokemons
    ```
