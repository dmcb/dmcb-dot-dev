## Setup site for development

        docker run --rm -it -v "$(pwd)":/app -v "$(pwd)/vendor/bundle":/usr/local/bundle evanshunt/taskrunner bundle install
        
## Build site

        docker run --rm -it -v "$(pwd)":/app -v "$(pwd)/vendor/bundle":/usr/local/bundle evanshunt/taskrunner bundle exec jekyll build

## Run site locally

        docker run --rm -it -p 4000:4000 -v "$(pwd)":/app -v "$(pwd)/vendor/bundle":/usr/local/bundle evanshunt/taskrunner bundle exec jekyll serve -H 0.0.0.0
