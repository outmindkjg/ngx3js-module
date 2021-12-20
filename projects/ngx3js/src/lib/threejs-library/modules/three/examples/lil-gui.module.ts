/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.11.0
 * @author George Michael Brower
 * @license MIT
 */
// @ts-nocheck
class t {
	constructor(e, i, s, r, n = 'div') {
		(this.parent = e),
			(this.object = i),
			(this.property = s),
			(this._disabled = !1),
			(this.initialValue = this.getValue()),
			(this.domElement = document.createElement('div')),
			this.domElement.classList.add('controller'),
			this.domElement.classList.add(r),
			(this.$name = document.createElement('div')),
			this.$name.classList.add('name'),
			(t.nextNameID = t.nextNameID || 0),
			(this.$name.id = 'lil-gui-name-' + ++t.nextNameID),
			(this.$widget = document.createElement(n)),
			this.$widget.classList.add('widget'),
			(this.$disable = this.$widget),
			this.domElement.appendChild(this.$name),
			this.domElement.appendChild(this.$widget),
			this.parent.children.push(this),
			this.parent.controllers.push(this),
			this.parent.$children.appendChild(this.domElement),
			(this._listenCallback = this._listenCallback.bind(this)),
			this.name(s);
	}
	name(t) {
		return (this._name = t), (this.$name.innerHTML = t), this;
	}
	onChange(t) {
		return (this._onChange = t), this;
	}
	_callOnChange() {
		this.parent._callOnChange(this), void 0 !== this._onChange && this._onChange.call(this, this.getValue());
	}
	onFinishChange(t) {
		return this.onChange(t);
	}
	reset() {
		return this.setValue(this.initialValue), this;
	}
	enable(t = !0) {
		return this.disable(!t);
	}
	disable(t = !0) {
		return (
			t === this._disabled ||
				((this._disabled = t),
				this.domElement.classList.toggle('disabled', t),
				t ? this.$disable.setAttribute('disabled', 'disabled') : this.$disable.removeAttribute('disabled')),
			this
		);
	}
	options(t) {
		const e = this.parent.add(this.object, this.property, t);
		return e.name(this._name), this.destroy(), e;
	}
	min(t) {
		return this;
	}
	max(t) {
		return this;
	}
	step(t) {
		return this;
	}
	listen(t = !0) {
		return (
			(this._listening = t),
			void 0 !== this._listenCallbackID &&
				(cancelAnimationFrame(this._listenCallbackID), (this._listenCallbackID = void 0)),
			this._listening && this._listenCallback(),
			this
		);
	}
	_listenCallback() {
		this._listenCallbackID = requestAnimationFrame(this._listenCallback);
		const t = this.getValue();
		(t === this._listenValuePrev && Object(t) !== t) || this.updateDisplay(), (this._listenValuePrev = t);
	}
	getValue() {
		return this.object[this.property];
	}
	setValue(t) {
		return (this.object[this.property] = t), this._callOnChange(), this.updateDisplay(), this;
	}
	updateDisplay() {
		return this;
	}
	load(t) {
		this.setValue(t);
	}
	save() {
		return this.getValue();
	}
	destroy() {
		this.parent.children.splice(this.parent.children.indexOf(this), 1),
			this.parent.controllers.splice(this.parent.controllers.indexOf(this), 1),
			this.parent.$children.removeChild(this.domElement);
	}
}
class e extends t {
	constructor(t, e, i) {
		super(t, e, i, 'boolean', 'label'),
			(this.$input = document.createElement('input')),
			this.$input.setAttribute('type', 'checkbox'),
			this.$widget.appendChild(this.$input),
			this.$input.addEventListener('change', () => {
				this.setValue(this.$input.checked);
			}),
			(this.$disable = this.$input),
			this.updateDisplay();
	}
	updateDisplay() {
		return (this.$input.checked = this.getValue()), this;
	}
}
function i(t) {
	let e, i;
	return (
		(e = t.match(/(#|0x)?([a-f0-9]{6})/i))
			? (i = e[2])
			: (e = t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))
			? (i =
					parseInt(e[1]).toString(16).padStart(2, 0) +
					parseInt(e[2]).toString(16).padStart(2, 0) +
					parseInt(e[3]).toString(16).padStart(2, 0))
			: (e = t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i)) && (i = e[1] + e[1] + e[2] + e[2] + e[3] + e[3]),
		!!i && '#' + i
	);
}
const s = { isPrimitive: !0, match: (t) => 'string' == typeof t, fromHexString: i, toHexString: i },
	r = {
		isPrimitive: !0,
		match: (t) => 'number' == typeof t,
		fromHexString: (t) => parseInt(t.substring(1), 16),
		toHexString: (t) => '#' + t.toString(16).padStart(6, 0),
	},
	n = {
		isPrimitive: !1,
		match: Array.isArray,
		fromHexString(t, e, i = 1) {
			const s = r.fromHexString(t);
			(e[0] = (((s >> 16) & 255) / 255) * i), (e[1] = (((s >> 8) & 255) / 255) * i), (e[2] = ((255 & s) / 255) * i);
		},
		toHexString: ([t, e, i], s = 1) => r.toHexString(((t * (s = 255 / s)) << 16) ^ ((e * s) << 8) ^ ((i * s) << 0)),
	},
	l = {
		isPrimitive: !1,
		match: (t) => Object(t) === t,
		fromHexString(t, e, i = 1) {
			const s = r.fromHexString(t);
			(e.r = (((s >> 16) & 255) / 255) * i), (e.g = (((s >> 8) & 255) / 255) * i), (e.b = ((255 & s) / 255) * i);
		},
		toHexString: ({ r: t, g: e, b: i }, s = 1) =>
			r.toHexString(((t * (s = 255 / s)) << 16) ^ ((e * s) << 8) ^ ((i * s) << 0)),
	},
	o = [s, r, n, l];
class a extends t {
	constructor(t, e, s, r) {
		var n;
		super(t, e, s, 'color'),
			(this.$input = document.createElement('input')),
			this.$input.setAttribute('type', 'color'),
			this.$input.setAttribute('tabindex', -1),
			this.$input.setAttribute('aria-labelledby', this.$name.id),
			(this.$text = document.createElement('input')),
			this.$text.setAttribute('type', 'text'),
			this.$text.setAttribute('spellcheck', 'false'),
			this.$text.setAttribute('aria-labelledby', this.$name.id),
			(this.$display = document.createElement('div')),
			this.$display.classList.add('display'),
			this.$display.appendChild(this.$input),
			this.$widget.appendChild(this.$display),
			this.$widget.appendChild(this.$text),
			(this._format = ((n = this.initialValue), o.find((t) => t.match(n)))),
			(this._rgbScale = r),
			(this._initialValueHexString = this.save()),
			(this._textFocused = !1);
		const l = () => {
			this._setValueFromHexString(this.$input.value);
		};
		this.$input.addEventListener('change', l),
			this.$input.addEventListener('input', l),
			this.$input.addEventListener('focus', () => {
				this.$display.classList.add('focus');
			}),
			this.$input.addEventListener('blur', () => {
				this.$display.classList.remove('focus');
			}),
			this.$text.addEventListener('input', () => {
				const t = i(this.$text.value);
				t && this._setValueFromHexString(t);
			}),
			this.$text.addEventListener('focus', () => {
				(this._textFocused = !0), this.$text.select();
			}),
			this.$text.addEventListener('blur', () => {
				(this._textFocused = !1), this.updateDisplay();
			}),
			(this.$disable = this.$text),
			this.updateDisplay();
	}
	reset() {
		return this._setValueFromHexString(this._initialValueHexString), this;
	}
	_setValueFromHexString(t) {
		if (this._format.isPrimitive) {
			const e = this._format.fromHexString(t);
			this.setValue(e);
		} else this._format.fromHexString(t, this.getValue(), this._rgbScale), this._callOnChange(), this.updateDisplay();
	}
	save() {
		return this._format.toHexString(this.getValue(), this._rgbScale);
	}
	load(t) {
		this._setValueFromHexString(t);
	}
	updateDisplay() {
		return (
			(this.$input.value = this._format.toHexString(this.getValue(), this._rgbScale)),
			this._textFocused || (this.$text.value = this.$input.value.substring(1)),
			(this.$display.style.backgroundColor = this.$input.value),
			this
		);
	}
}
class h extends t {
	constructor(t, e, i) {
		super(t, e, i, 'function'),
			(this.$button = document.createElement('button')),
			this.$button.appendChild(this.$name),
			this.$widget.appendChild(this.$button),
			this.$button.addEventListener('click', (t) => {
				t.preventDefault(), this.getValue().call(this.object);
			}),
			this.$button.addEventListener('touchstart', () => {}, {passive: true}),
			(this.$disable = this.$button);
	}
}
class d extends t {
	constructor(t, e, i, s, r, n) {
		super(t, e, i, 'number'), this._initInput(), this.min(s), this.max(r);
		const l = void 0 !== n;
		this.step(l ? n : this._getImplicitStep(), l), this.updateDisplay();
	}
	min(t) {
		return (this._min = t), this._onUpdateMinMax(), this;
	}
	max(t) {
		return (this._max = t), this._onUpdateMinMax(), this;
	}
	step(t, e = !0) {
		return (this._step = t), (this._stepExplicit = e), this;
	}
	updateDisplay() {
		const t = this.getValue();
		if (this._hasSlider) {
			const e = (t - this._min) / (this._max - this._min);
			this.$fill.style.setProperty('width', 100 * e + '%');
		}
		return this._inputFocused || (this.$input.value = t), this;
	}
	_initInput() {
		(this.$input = document.createElement('input')),
			this.$input.setAttribute('type', 'text'),
			this.$input.setAttribute('inputmode', 'numeric'),
			this.$input.setAttribute('aria-labelledby', this.$name.id),
			this.$widget.appendChild(this.$input),
			(this.$disable = this.$input);
		const t = (t) => {
			const e = parseFloat(this.$input.value);
			isNaN(e) || (this._snapClampSetValue(e + t), (this.$input.value = this.getValue()));
		};
		this.$input.addEventListener('focus', () => {
			this._inputFocused = !0;
		}),
			this.$input.addEventListener('input', () => {
				const t = parseFloat(this.$input.value);
				isNaN(t) || this.setValue(this._clamp(t));
			}),
			this.$input.addEventListener('blur', () => {
				(this._inputFocused = !1), this.updateDisplay();
			}),
			this.$input.addEventListener('keydown', (e) => {
				'Enter' === e.code && this.$input.blur(),
					'ArrowUp' === e.code && (e.preventDefault(), t(this._step * this._arrowKeyMultiplier(e))),
					'ArrowDown' === e.code && (e.preventDefault(), t(-1 * this._step * this._arrowKeyMultiplier(e)));
			}),
			this.$input.addEventListener(
				'wheel',
				(e) => {
					this._inputFocused && (e.preventDefault(), t(this._normalizeMouseWheel(e) * this._step));
				},
				{ passive: !1 }
			);
	}
	_initSlider() {
		(this._hasSlider = !0),
			(this.$slider = document.createElement('div')),
			this.$slider.classList.add('slider'),
			(this.$fill = document.createElement('div')),
			this.$fill.classList.add('fill'),
			this.$slider.appendChild(this.$fill),
			this.$widget.insertBefore(this.$slider, this.$input),
			this.domElement.classList.add('hasSlider');
		const t = (t) => {
				const e = this.$slider.getBoundingClientRect();
				let i =
					((s = t), (r = e.left), (n = e.right), (l = this._min), (o = this._max), ((s - r) / (n - r)) * (o - l) + l);
				var s, r, n, l, o;
				this._snapClampSetValue(i);
			},
			e = (e) => {
				t(e.clientX);
			},
			i = () => {
				this._setActiveStyle(!1), window.removeEventListener('mousemove', e), window.removeEventListener('mouseup', i);
			};
		this.$slider.addEventListener('mousedown', (s) => {
			t(s.clientX),
				this._setActiveStyle(!0),
				window.addEventListener('mousemove', e),
				window.addEventListener('mouseup', i);
		});
		let s,
			r,
			n = !1;
		const l = (e) => {
				if (n) {
					const i = e.touches[0].clientX - s,
						a = e.touches[0].clientY - r;
					Math.abs(i) > Math.abs(a)
						? (e.preventDefault(), t(e.touches[0].clientX), this._setActiveStyle(!0), (n = !1))
						: (window.removeEventListener('touchmove', l), window.removeEventListener('touchend', o));
				} else e.preventDefault(), t(e.touches[0].clientX);
			},
			o = () => {
				this._setActiveStyle(!1), window.removeEventListener('touchmove', l), window.removeEventListener('touchend', o);
			};
		this.$slider.addEventListener('touchstart', (e) => {
			e.touches.length > 1 ||
				(this._hasScrollBar
					? ((s = e.touches[0].clientX), (r = e.touches[0].clientY), (n = !0))
					: (e.preventDefault(), t(e.touches[0].clientX), this._setActiveStyle(!0), (n = !1)),
				window.addEventListener('touchmove', l, { passive: !1 }),
				window.addEventListener('touchend', o));
		}, {passive: true});
		this.$slider.addEventListener(
			'wheel',
			(t) => {
				if (Math.abs(t.deltaX) < Math.abs(t.deltaY) && this._hasScrollBar) return;
				t.preventDefault();
				const e = this._normalizeMouseWheel(t) * this._step;
				this._snapClampSetValue(this.getValue() + e);
			},
			{ passive: !1 }
		);
	}
	_setActiveStyle(t) {
		this.$slider.classList.toggle('active', t), document.body.classList.toggle('lil-gui-slider-active', t);
	}
	_getImplicitStep() {
		return this._hasMin && this._hasMax ? (this._max - this._min) / 1e3 : 0.1;
	}
	_onUpdateMinMax() {
		!this._hasSlider &&
			this._hasMin &&
			this._hasMax &&
			(this._stepExplicit || this.step(this._getImplicitStep(), !1), this._initSlider(), this.updateDisplay());
	}
	_normalizeMouseWheel(t) {
		let { deltaX: e, deltaY: i } = t;
		Math.floor(t.deltaY) !== t.deltaY && t.wheelDelta && ((e = 0), (i = -t.wheelDelta / 120));
		return e + -i;
	}
	_arrowKeyMultiplier(t) {
		return this._stepExplicit ? (t.shiftKey ? 10 : 1) : t.shiftKey ? 100 : t.altKey ? 1 : 10;
	}
	_snap(t) {
		const e = Math.round(t / this._step) * this._step;
		return parseFloat(e.toPrecision(15));
	}
	_clamp(t) {
		const e = this._hasMin ? this._min : -1 / 0,
			i = this._hasMax ? this._max : 1 / 0;
		return Math.max(e, Math.min(i, t));
	}
	_snapClampSetValue(t) {
		this.setValue(this._clamp(this._snap(t)));
	}
	get _hasScrollBar() {
		const t = this.parent.root.$children;
		return t.scrollHeight > t.clientHeight;
	}
	get _hasMin() {
		return void 0 !== this._min;
	}
	get _hasMax() {
		return void 0 !== this._max;
	}
}
class c extends t {
	constructor(t, e, i, s) {
		super(t, e, i, 'option'),
			(this.$select = document.createElement('select')),
			this.$select.setAttribute('aria-labelledby', this.$name.id),
			(this.$display = document.createElement('div')),
			this.$display.classList.add('display'),
			(this._values = Array.isArray(s) ? s : Object.values(s)),
			(this._names = Array.isArray(s) ? s : Object.keys(s)),
			this._names.forEach((t) => {
				const e = document.createElement('option');
				(e.innerHTML = t), this.$select.appendChild(e);
			}),
			this.$select.addEventListener('change', () => {
				this.setValue(this._values[this.$select.selectedIndex]);
			}),
			this.$select.addEventListener('focus', () => {
				this.$display.classList.add('focus');
			}),
			this.$select.addEventListener('blur', () => {
				this.$display.classList.remove('focus');
			}),
			this.$widget.appendChild(this.$select),
			this.$widget.appendChild(this.$display),
			(this.$disable = this.$select),
			this.updateDisplay();
	}
	updateDisplay() {
		const t = this.getValue(),
			e = this._values.indexOf(t);
		return (this.$select.selectedIndex = e), (this.$display.innerHTML = -1 === e ? t : this._names[e]), this;
	}
}
class u extends t {
	constructor(t, e, i) {
		super(t, e, i, 'string'),
			(this.$input = document.createElement('input')),
			this.$input.setAttribute('type', 'text'),
			this.$input.setAttribute('aria-labelledby', this.$name.id),
			this.$input.addEventListener('input', () => {
				this.setValue(this.$input.value);
			}),
			this.$input.addEventListener('keydown', (t) => {
				'Enter' === t.code && this.$input.blur();
			}),
			this.$widget.appendChild(this.$input),
			(this.$disable = this.$input),
			this.updateDisplay();
	}
	updateDisplay() {
		return (this.$input.value = this.getValue()), this;
	}
}
let p = !1;
class g {
	constructor({
		parent: t,
		autoPlace: e = void 0 === t,
		touchStyles: i = !0,
		container: s,
		injectStyles: r = !0,
		title: n = 'Controls',
		width: l,
	} = {}) {
		if (
			((this.parent = t),
			(this.root = t ? t.root : this),
			(this.children = []),
			(this.controllers = []),
			(this.folders = []),
			(this._closed = !1),
			(this.domElement = document.createElement('div')),
			this.domElement.classList.add('lil-gui'),
			(this.$title = document.createElement('div')),
			this.$title.classList.add('title'),
			this.$title.setAttribute('role', 'button'),
			this.$title.setAttribute('aria-expanded', !0),
			this.$title.setAttribute('tabindex', 0),
			this.$title.addEventListener('click', () => this.openAnimated(this._closed)),
			this.$title.addEventListener('keydown', (t) => {
				('Enter' !== t.code && 'Space' !== t.code) || (t.preventDefault(), this.$title.click());
			}),
			this.$title.addEventListener('touchstart', () => {}, {passive: true}),
			(this.$children = document.createElement('div')),
			this.$children.classList.add('children'),
			this.domElement.appendChild(this.$title),
			this.domElement.appendChild(this.$children),
			this.title(n),
			this.parent)
		)
			return (
				this.parent.children.push(this),
				this.parent.folders.push(this),
				void this.parent.$children.appendChild(this.domElement)
			);
		this.domElement.classList.add('root'),
			!p &&
				r &&
				(!(function (t) {
					const e = document.createElement('style');
					e.innerHTML = t;
					const i = document.querySelector('head link[rel=stylesheet], head style');
					i ? document.head.insertBefore(e, i) : document.head.appendChild(e);
				})(
					'.lil-gui{font-family:var(--font-family);font-size:var(--font-size);line-height:1;font-weight:normal;font-style:normal;text-align:left;background-color:var(--background-color);color:var(--text-color);user-select:none;-webkit-user-select:none;touch-action:manipulation;--background-color:#1f1f1f;--text-color:#ebebeb;--title-background-color:#111;--title-text-color:#ebebeb;--widget-color:#424242;--hover-color:#4f4f4f;--focus-color:#595959;--number-color:#2cc9ff;--string-color:#a2db3c;--font-size:11px;--input-font-size:11px;--font-family:-apple-system,BlinkMacSystemFont,"Lucida Grande","Segoe UI",Roboto,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";--font-family-mono:Menlo,Monaco,Consolas,"Droid Sans Mono",monospace,"Droid Sans Fallback";--padding:4px;--spacing:4px;--widget-height:20px;--name-width:45%;--slider-knob-width:2px;--slider-input-width:27%;--color-input-width:27%;--slider-input-min-width:45px;--color-input-min-width:45px;--folder-indent:7px;--widget-padding:0 0 0 3px;--widget-border-radius:2px;--checkbox-size:calc(.75*var(--widget-height));--scrollbar-width: 5px}.lil-gui,.lil-gui *{box-sizing:border-box;margin:0}.lil-gui.root{width:var(--width, 245px);display:flex;flex-direction:column}.lil-gui.root>.title{background:var(--title-background-color);color:var(--title-text-color)}.lil-gui.root>.children{overflow:auto}.lil-gui.root>.children::-webkit-scrollbar{width:var(--scrollbar-width);height:var(--scrollbar-width);background:var(--background-color)}.lil-gui.root>.children::-webkit-scrollbar-thumb{border-radius:var(--scrollbar-width);background:var(--focus-color)}.lil-gui .lil-gui{--background-color:inherit;--text-color:inherit;--title-background-color:inherit;--title-text-color:inherit;--widget-color:inherit;--hover-color:inherit;--focus-color:inherit;--number-color:inherit;--string-color:inherit;--font-size:inherit;--input-font-size:inherit;--font-family:inherit;--font-family-mono:inherit;--padding:inherit;--spacing:inherit;--widget-height:inherit;--name-width:inherit;--slider-knob-width:inherit;--slider-input-width:inherit;--color-input-width:inherit;--slider-input-min-width:inherit;--color-input-min-width:inherit;--folder-indent:inherit;--widget-padding:inherit;--widget-border-radius:inherit;--checkbox-size:inherit}@media(pointer: coarse){.lil-gui.allow-touch-styles{--widget-height: 28px;--padding: 6px;--spacing: 6px;--font-size: 13px;--input-font-size: 16px;--folder-indent: 10px;--widget-padding: 0 0 0 3px;--scrollbar-width: 7px;--slider-input-min-width: 50px;--color-input-min-width: 65px}}.lil-gui.force-touch-styles{--widget-height: 28px;--padding: 6px;--spacing: 6px;--font-size: 13px;--input-font-size: 16px;--folder-indent: 10px;--widget-padding: 0 0 0 3px;--scrollbar-width: 7px;--slider-input-min-width: 50px;--color-input-min-width: 65px}.lil-gui.autoPlace{max-height:100%;position:fixed;top:0;right:15px;z-index:1001}.lil-gui .controller{display:flex;align-items:center;padding:0 var(--padding);margin:var(--spacing) 0}.lil-gui .controller.disabled{opacity:.5}.lil-gui .controller.disabled,.lil-gui .controller.disabled *{pointer-events:none !important}.lil-gui .controller .name{min-width:var(--name-width);flex-shrink:0;white-space:pre;padding-right:var(--spacing);line-height:var(--widget-height)}.lil-gui .controller .widget{position:relative;display:flex;align-items:center;width:100%;min-height:var(--widget-height)}.lil-gui .controller.function .name{line-height:unset;padding:0}.lil-gui .controller.string input{color:var(--string-color)}.lil-gui .controller.boolean .widget{cursor:pointer}.lil-gui .controller.color .display{width:100%;height:var(--widget-height);border-radius:var(--widget-border-radius);position:relative}@media(hover: hover){.lil-gui .controller.color .display:hover:before{content:" ";display:block;position:absolute;border-radius:var(--widget-border-radius);border:1px solid #fff9;left:0;right:0;top:0;bottom:0}}.lil-gui .controller.color input[type=color]{opacity:0;width:100%;height:100%;cursor:pointer}.lil-gui .controller.color input[type=text]{margin-left:var(--spacing);font-family:var(--font-family-mono);min-width:var(--color-input-min-width);width:var(--color-input-width);flex-shrink:0}.lil-gui .controller.option select{opacity:0;position:absolute;width:100%;max-width:100%}.lil-gui .controller.option .display{position:relative;pointer-events:none;border-radius:var(--widget-border-radius);height:var(--widget-height);line-height:var(--widget-height);max-width:100%;overflow:hidden;word-break:break-all;padding-left:.55em;padding-right:1.75em;background:var(--widget-color)}@media(hover: hover){.lil-gui .controller.option .display.focus{background:var(--focus-color)}}.lil-gui .controller.option .display.active{background:var(--focus-color)}.lil-gui .controller.option .display:after{font-family:"lil-gui";content:"↕";position:absolute;top:0;right:0;bottom:0;padding-right:.375em}.lil-gui .controller.option .widget,.lil-gui .controller.option select{cursor:pointer}@media(hover: hover){.lil-gui .controller.option .widget:hover .display{background:var(--hover-color)}}.lil-gui .controller.number input{color:var(--number-color)}.lil-gui .controller.number.hasSlider input{margin-left:var(--spacing);width:var(--slider-input-width);min-width:var(--slider-input-min-width);flex-shrink:0}.lil-gui .controller.number .slider{width:100%;height:var(--widget-height);background-color:var(--widget-color);border-radius:var(--widget-border-radius);padding-right:var(--slider-knob-width);overflow:hidden;cursor:ew-resize;touch-action:pan-y}@media(hover: hover){.lil-gui .controller.number .slider:hover{background-color:var(--hover-color)}}.lil-gui .controller.number .slider.active{background-color:var(--focus-color)}.lil-gui .controller.number .slider.active .fill{opacity:.95}.lil-gui .controller.number .fill{height:100%;border-right:var(--slider-knob-width) solid var(--number-color);box-sizing:content-box}.lil-gui-slider-active .lil-gui{--hover-color: var(--widget-color)}.lil-gui-slider-active *{cursor:ew-resize !important}.lil-gui .title{--title-height: calc(var(--widget-height) + var(--spacing) * 1.25);height:var(--title-height);line-height:calc(var(--title-height) - 4px);font-weight:600;padding:0 var(--padding);-webkit-tap-highlight-color:transparent;cursor:pointer;outline:none;text-decoration-skip:objects}.lil-gui .title:before{font-family:"lil-gui";content:"▾";padding-right:2px;display:inline-block}.lil-gui .title:active{background:var(--title-background-color);opacity:.75}@media(hover: hover){.lil-gui .title:hover{background:var(--title-background-color);opacity:.85}.lil-gui .title:focus{text-decoration:underline var(--focus-color)}}.lil-gui.root>.title:focus{text-decoration:none !important}.lil-gui.closed>.title:before{content:"▸"}.lil-gui.closed>.children{transform:translateY(-7px);opacity:0}.lil-gui.closed:not(.transition)>.children{display:none}.lil-gui.transition>.children{transition-duration:300ms;transition-property:height,opacity,transform;transition-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);overflow:hidden;pointer-events:none}.lil-gui .children:empty:before{content:"Empty";padding:0 var(--padding);margin:var(--spacing) 0;display:block;height:var(--widget-height);font-style:italic;line-height:var(--widget-height);opacity:.5}.lil-gui.root>.children>.lil-gui>.title{border:0 solid var(--widget-color);border-width:1px 0;transition:border-color 300ms}.lil-gui.root>.children>.lil-gui.closed>.title{border-bottom-color:transparent}.lil-gui+.controller{border-top:1px solid var(--widget-color);margin-top:0;padding-top:var(--spacing)}.lil-gui .lil-gui .lil-gui>.title{border:none}.lil-gui .lil-gui .lil-gui>.children{border:none;margin-left:var(--folder-indent);border-left:2px solid var(--widget-color)}.lil-gui .lil-gui .controller{border:none}.lil-gui input{-webkit-tap-highlight-color:transparent;border:0;outline:none;font-family:var(--font-family);font-size:var(--input-font-size);border-radius:var(--widget-border-radius);height:var(--widget-height);background:var(--widget-color);color:var(--text-color);width:100%}@media(hover: hover){.lil-gui input:hover{background:var(--hover-color)}.lil-gui input:active{background:var(--focus-color)}}.lil-gui input[type=text]{padding:var(--widget-padding)}.lil-gui input[type=text]:focus{background:var(--focus-color)}.lil-gui input[type=checkbox]{appearance:none;-webkit-appearance:none;height:var(--checkbox-size);width:var(--checkbox-size);border-radius:var(--widget-border-radius);text-align:center}.lil-gui input[type=checkbox]:checked:before{font-family:"lil-gui";content:"✓";font-size:var(--checkbox-size);line-height:var(--checkbox-size)}@media(hover: hover){.lil-gui input[type=checkbox]:focus{box-shadow:inset 0 0 0 1px var(--focus-color)}}.lil-gui button{-webkit-tap-highlight-color:transparent;outline:none;cursor:pointer;font-family:var(--font-family);font-size:var(--font-size);color:var(--text-color);width:100%;height:var(--widget-height);text-transform:none;background:var(--widget-color);border-radius:var(--widget-border-radius);border:1px solid var(--widget-color);text-align:center;line-height:calc(var(--widget-height)*.725)}@media(hover: hover){.lil-gui button:hover{background:var(--hover-color);border-color:var(--hover-color)}.lil-gui button:focus{border-color:var(--focus-color)}}.lil-gui button:active{background:var(--focus-color)}@font-face{font-family:"lil-gui";src:url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZ5WI2hlYWQAAAMcAAAAJwAAADZfcj23aGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhjAGJgZWBgZ7RnFRdnVJELCRlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB76woyAHicY2BkYGAA4sklsQ/j+W2+MnAzpDBgAyEMYUCSg4EJxAEAvVwFCgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff")}'
				),
				(p = !0)),
			s
				? s.appendChild(this.domElement)
				: e && (this.domElement.classList.add('autoPlace'), document.body.appendChild(this.domElement)),
			i && this.domElement.classList.add('allow-touch-styles'),
			l && this.domElement.style.setProperty('--width', l + 'px');
	}
	add(t, i, s, r, n) {
		if (Object(s) === s) return new c(this, t, i, s);
		const l = t[i];
		switch (typeof l) {
			case 'number':
				return new d(this, t, i, s, r, n);
			case 'boolean':
				return new e(this, t, i);
			case 'string':
				return new u(this, t, i);
			case 'function':
				return new h(this, t, i);
		}
		console.error(`Failed to add controller for "${i}"`, l, t);
	}
	addColor(t, e, i = 1) {
		return new a(this, t, e, i);
	}
	addFolder(t) {
		return new g({ parent: this, title: t });
	}
	load(t, e = !0) {
		if (!('controllers' in t)) throw new Error('Invalid load object. Should contain a "controllers" key.');
		return (
			this.controllers.forEach((e) => {
				e instanceof h || (e._name in t.controllers && e.load(t.controllers[e._name]));
			}),
			e &&
				t.folders &&
				this.folders.forEach((e) => {
					e._title in t.folders && e.load(t.folders[e._title]);
				}),
			this
		);
	}
	save(t = !0) {
		const e = { controllers: {}, folders: {} };
		return (
			this.controllers.forEach((t) => {
				if (!(t instanceof h)) {
					if (t._name in e.controllers) throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);
					e.controllers[t._name] = t.save();
				}
			}),
			t &&
				this.folders.forEach((t) => {
					if (t._title in e.folders) throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);
					e.folders[t._title] = t.save();
				}),
			e
		);
	}
	open(t = !0) {
		return (
			(this._closed = !t),
			this.$title.setAttribute('aria-expanded', !this._closed),
			this.domElement.classList.toggle('closed', this._closed),
			this
		);
	}
	close() {
		return this.open(!1);
	}
	openAnimated(t = !0) {
		return (
			(this._closed = !t),
			this.$title.setAttribute('aria-expanded', !this._closed),
			requestAnimationFrame(() => {
				const e = this.$children.clientHeight;
				(this.$children.style.height = e + 'px'), this.domElement.classList.add('transition');
				const i = (t) => {
					t.target === this.$children &&
						((this.$children.style.height = ''),
						this.domElement.classList.remove('transition'),
						this.$children.removeEventListener('transitionend', i));
				};
				this.$children.addEventListener('transitionend', i);
				const s = t ? this.$children.scrollHeight : 0;
				this.domElement.classList.toggle('closed', !t),
					requestAnimationFrame(() => {
						this.$children.style.height = s + 'px';
					});
			}),
			this
		);
	}
	title(t) {
		return (this._title = t), (this.$title.innerHTML = t), this;
	}
	reset(t = !0) {
		return (t ? this.controllersRecursive() : this.controllers).forEach((t) => t.reset()), this;
	}
	onChange(t) {
		return (this._onChange = t), this;
	}
	_callOnChange(t) {
		this.parent && this.parent._callOnChange(t),
			void 0 !== this._onChange &&
				this._onChange.call(this, { object: t.object, property: t.property, value: t.getValue(), controller: t });
	}
	destroy() {
		this.parent &&
			(this.parent.children.splice(this.parent.children.indexOf(this), 1),
			this.parent.folders.splice(this.parent.folders.indexOf(this), 1)),
			this.domElement.parentElement && this.domElement.parentElement.removeChild(this.domElement),
			Array.from(this.children).forEach((t) => t.destroy()),
			this._onResize && window.removeEventListener('resize', this._onResize);
	}
	controllersRecursive() {
		let t = Array.from(this.controllers);
		return (
			this.folders.forEach((e) => {
				t = t.concat(e.controllersRecursive());
			}),
			t
		);
	}
	foldersRecursive() {
		let t = Array.from(this.folders);
		return (
			this.folders.forEach((e) => {
				t = t.concat(e.foldersRecursive());
			}),
			t
		);
	}
}
export default g;
export {
	e as BooleanController,
	a as ColorController,
	t as Controller,
	h as FunctionController,
	g as GUI,
	d as NumberController,
	c as OptionController,
	u as StringController,
};
