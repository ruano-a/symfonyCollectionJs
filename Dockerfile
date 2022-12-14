FROM jekyll/builder

WORKDIR /tmp
ADD Gemfile /tmp/
ADD Gemfile.lock /tmp/
RUN bundle install

FROM jekyll/jekyll:4.2.0

VOLUME /src
EXPOSE 4000

WORKDIR /src
ENTRYPOINT ["jekyll", "serve", "--livereload", "-H", "0.0.0.0"]
