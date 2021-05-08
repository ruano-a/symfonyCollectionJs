# symfonyCollectionJs tests

# How to start the tests

The simplest way is to open the page index_with_jquery.html or index_without_jquery.html in the test folder. 
It starts the tests on opening.

For more detailed informations, such as the test coverage, you'll need to install the dependencies:

# Install with yarn
```sh
yarn install
```

# Or install with npm
```sh
npm install
```

Then if you don't have the karma CLI :

```sh
./node_modules/.bin/karma karma_jquery.conf.js #to test with jquery
./node_modules/.bin/karma karma_nojquery.conf.js  #to test without jquery
```

If you do have the karma CLI (and it fixed issues for me) :

```sh
karma karma_jquery.conf.js #to test with jquery
karma karma_nojquery.conf.js  #to test without jquery
```

You can find the test coverage informations in the 'coverage' folder.