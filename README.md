# f7-supersonic-ember

Ember CLI [Framework7](http://www.idangero.us/framework7/) brings the great
mobile development framework to Ember CLI. We try to integrate it as good as
possible, since the framework itself is developed for use with
[Angular JS](https://angularjs.org/).

Please note, that this version is kind of a [minimal viable product](https://en.wikipedia.org/wiki/Minimum_viable_product)
at the moment but we will keep improving it. If you are interested to
support us, we will be excited to receive your pull requests.

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* 
    npm install --save-dev ember-cli-framework7
    ember g ember-cli-framework7

## Usage

After you installed Ember CLI Framework7, you can just start using it
within your app. Please refer to the Framework7 [documentation](http://www.idangero.us/framework7/docs/)
to see the markup structure.

In order to be able to use the JavaScript based features of Framework7,
a service is registered within the routes, controllers and components as
`f7`. Within the further documentation we will use the [EmberScript](http://emberscript.com/)
notation for explanations.

```coffeescript
# EmberScript
@f7.alert 'Some alert'
```

```coffeescript
# CoffeeScript
@get('f7').alert 'Some alert'
```

```javascript
// JavaScript
this.get('f7').alert('Some alert');
```

We will also use the [Emblem](http://emblemjs.com/) syntax to explain templates.

Since the `f7` service extends an instance of the Framework7 class, it
supports all JavaScript methods available for a Framework7 application.
All this methods can be found in the Framework7 documentation.

## Features

In order to simplify the work with Framework7 within Ember, we added
some component and additional methods on the `f7` service.

### Navbar

Framework7 requires to call `sizeNavbars` after rendering a navbar in
order to ensure the title is centered. Therefore we included a component
creating the required markup for navbars and ensuring the title to be
centered.

```emblem
= navbar
  .left
    a.link.icon-only href="#" click="toggleSidePanel"
      i.icon.icon-bars
```

### Side Panel

For creating the side panel markup and knowing how to toggle it, please refer
to the [side panel documentation of Framework7](http://www.idangero.us/framework7/docs/side-panels.html).

In order to support opening and closing the side panel by swiping, you
need to initialize the listeners within an initializer.

```coffeescript
Framework7Initializer =
  name: 'framework7'
  after: 'framework7-service'
  initialize: (container, application) ->
    Ember.run.schedule 'afterRender', ->
      container.lookup('service:framework7').initSwipePanels 'left'

`export default Framework7Initializer`
```

### Preloader

The preloader shows a loading mask as an overlay on the application. To
see how it works, please refer to the [preloader documentation of
Framework7](http://www.idangero.us/framework7/docs/preloader.html). In
order to ensure to only show the preloader for long running requests, we
added an delay option to it, so it only shows up if the request was not
finished within the given amount of time.

```coffeescript
# ...
actions:
  save: ->
    @f7.showPreloader delay: 300
    @model.save().then =>
      @f7.hidePreloader()
      @transitionToRoute 'index'
    , =>
      @f7.alert 'error'
```

### Pull-to-refresh

Pull to refresh is supported by Framework7 but there is a bit work to do
to make it run in Ember. In order to understand how pull-to-refresh
works in Framework7, please refer to the [pull-to-refresh
documentation](http://www.idangero.us/framework7/docs/pull-to-refresh.html). To make it as easy as possible to integrate pull-to-refresh into your Ember application, we wrapped all the magic into a component.

```emblem
.pages
  .page.navbar-fixed
    = f7-pull-to-refresh action="refresh"
      .list-block
        ul
          /...
```

The refresh action gets a deferred promise passed as the first parameter
which must either be resolved or rejected in order to close the
pull-to-refresh indicator.

```coffeescript
# ...
actions:
  refresh: (deferred) ->
    Ember.run.later this, (->
      deferred.resolve()
    ), 1000
```

### Swipeout

Swipeout markup needs to be initialized. This can be done by using the
component `f7-swipeout`.

```emblem
.list-block
  ul
    = each
      = f7-swipeout
        .swipeout-content
          a.item-link.item-content href="#" click="'itemClicked' this"
            .item-inner
              .item-title = this
        .swipeout-actions-left
          a href="#"
            | Action 1
          a href="#"
            | Action 2
        .swipeout-actions-right
          a href="#"
            | Action 1
          a.swipeout-delete.swipeout-overswipe" href="#" click="delete this"
            | Delete
```

## Running the dummy app

The dummy app is a small example of Framework7 within an Ember CLI
application.

* `git clone git@github.com:ember-mobile/ember-cli-framework7.git`
* `npm install`
* `bower install`
* `ember server`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

