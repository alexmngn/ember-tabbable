# Ember-tabbable [![Build Status](https://travis-ci.org/4lex-io/ember-tabbable.png?branch=master)](https://travis-ci.org/4lex-io/ember-tabbable)

This is a simple Ember-CLI addon which provide the uses the ':tabbable' and ':focusable' selectors from jQuery UI Core.

## Installation

```
ember install ember-tabbable
```

## Usage

You will be able to use the selectors `:tabbable` and `:focusable` directly in your project.

```
import Ember from 'ember';

export default Component.extend({
    didInsertElement() {
        const tabbableElements = this.$(':tabbable');
        const focusableElements = this.$(':focusable');
    }
});
```
