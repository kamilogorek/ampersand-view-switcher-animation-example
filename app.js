var AmpersandView = require('ampersand-view');
var AmpersandViewSwitcher = require('ampersand-view-switcher');

var MyView = AmpersandView.extend({
    session: {
        isActive: ['boolean', true, false]
    }
});

var viewOne = new MyView({
    template: '<h1 class="one animated">View Number One</h1>'
});

var viewTwo = new MyView({
    template: '<h1 class="two animated">View Number Two</h1>'
});

var ViewMain = AmpersandView.extend({
    template: '<div>' +
                  '<h1>View Switcher</h1>' +
                  '<section data-hook=switcher></section>' +
                  '<button data-hook=switch>Switch</button>' +
              '</div>',
    events: {
        'click [data-hook=switch]': 'switchView'
    },
    render: function () {
        this.renderWithTemplate();
        this.switcher = new AmpersandViewSwitcher(this.queryByHook('switcher'), {
            waitForRemove: true,
            hide: function (oldView, cb) {
                oldView.isActive = false;
                oldView.el.classList.add('fadeOut');
                setTimeout(function () {
                    oldView.el.classList.remove('fadeOut');    
                    cb();
                }, 1000);
            },
            show: function (newView) {
                newView.isActive = true;
                newView.el.classList.add('fadeIn');
                setTimeout(function () {
                    newView.el.classList.remove('fadeIn');    
                }, 1000);
            }
        });
        this.switcher.set(viewOne);
    },
    switchView: function () {
        this.switcher.set(viewOne.isActive ? viewTwo : viewOne);
    }
});

var viewMain = new ViewMain();
viewMain.render();

require('domready')(function () {
    document.body.appendChild(viewMain.el);
});
