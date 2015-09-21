/**
 * Includes ':tabbable' and ':focusable' selectors from jQuery UI Core
 */

import Ember from 'ember';

var jqueryTabbable = Ember.Object.create({

	init() {
		var self = this;
		if (!Ember.$.expr[':'].focusable) {
			Ember.$.extend(Ember.$.expr[':'], {
				focusable(element) {
					return self.focusable(element, !isNaN(Ember.$.attr(element, 'tabindex')));
				},

				tabbable(element) {
					return self.tabbable(element);
				}
			});
		}
	},

	focusable(element, isTabIndexNotNaN) {
		let map;
		let mapName;
		let img;
		const nodeName = element.nodeName.toLowerCase();
		if ('area' === nodeName) {
			map = element.parentNode;
			mapName = map.name;
			if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
				return false;
			}
			img = Ember.$('img[usemap="#' + mapName + '"]');
			return !!img && this.visible(img);
		}
		return (/^(input|select|textarea|button|object)$/.test(nodeName) ?
			!element.disabled :
			'a' === nodeName ?
				element.href || isTabIndexNotNaN :
				isTabIndexNotNaN) &&
			// the element and all of its ancestors must be visible
			this.visible(element);
	},

	tabbable(element) {
		const tabIndex = Ember.$.attr(element, 'tabindex');
		const isTabIndexNaN = isNaN(tabIndex);
		return (isTabIndexNaN || tabIndex >= 0) && this.focusable(element, !isTabIndexNaN);
	},

	visible(element) {
		return Ember.$.expr.filters.visible(element) &&
			!Ember.$(element).parents().addBack().filter(function () {
				return Ember.$.css(this, 'visibility') === 'hidden';
			}).length;
	}
});

export default {
	name: 'jqueryTabbable',

	initialize() {
		jqueryTabbable.init();
	}
};
