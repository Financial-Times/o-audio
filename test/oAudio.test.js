/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import OTrackingCollector from './helpers/o-tracking-collector';

import OAudio from './../main';

describe("OAudio", () => {
	it('is defined', () => {
		proclaim.equal(typeof OAudio, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof OAudio.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(OAudio, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(OAudio, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = OAudio.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof OAudio, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = OAudio.init('#element');
			proclaim.equal(boilerplate instanceof OAudio, true);
		});
	});

	describe('tracking listening time', () => {
		const oTracking = new OTrackingCollector();
		const stubAudioEl = new EventTarget();

		after(() => oTracking.stop());

		it('when the component is destroyed', () => {
			const events = oTracking.start();

			const audio = new OAudio(stubAudioEl);
			audio.destroy();

			proclaim.lengthEquals(events, 1);
			const { action } = events[0];
			proclaim.equal(action, "listened");
		});

		it('when a given event on the window is fired', () => {
			const events = oTracking.start();
			new OAudio(stubAudioEl, {
				unloadEventName: 'unload-event'
			});
			window.dispatchEvent(new Event('unload-event'));
			proclaim.lengthEquals(events, 1);
			const { action } = events[0];
			proclaim.equal(action, "listened");
		});
	});

});