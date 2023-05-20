/* eslint-disable prefer-arrow-callback */
/* eslint-disable one-var */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-var */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable func-names */
/* eslint-disable no-shadow-restricted-names */
/* eslint-disable @typescript-eslint/no-unused-vars */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useEffect } from 'react';
import $ from 'jquery';

const LogoBackgroundAnimate: React.FC<TLogoBackgroundAnimateProps> = ({
  animate = true,
}) => {
  const initEffect = (): void => {
    (function (window, undefined) {
      $.fn.marqueeify = function (options) {
        var settings = $.extend(
          {
            horizontal: true,
            vertical: true,
            speed: 100, // In pixels per second
            container: $(this).parent(),
            bumpEdge: function () {},
          },
          options,
        );

        return this.each(function () {
          var containerWidth,
            containerHeight,
            elWidth,
            elHeight,
            move,
            getSizes,
            $el = $(this);

          getSizes = function () {
            containerWidth = settings.container.outerWidth();
            containerHeight = settings.container.outerHeight();
            elWidth = $el.outerWidth();
            elHeight = $el.outerHeight();
          };

          move = {
            right: function () {
              $el.animate(
                { left: containerWidth - elWidth },
                {
                  duration: (containerWidth / settings.speed) * 1000,
                  queue: false,
                  easing: 'linear',
                  complete: function () {
                    settings.bumpEdge();
                    move.left();
                  },
                },
              );
            },
            left: function () {
              $el.animate(
                { left: 0 },
                {
                  duration: (containerWidth / settings.speed) * 1000,
                  queue: false,
                  easing: 'linear',
                  complete: function () {
                    settings.bumpEdge();
                    move.right();
                  },
                },
              );
            },
            down: function () {
              $el.animate(
                { top: containerHeight - elHeight },
                {
                  duration: (containerHeight / settings.speed) * 1000,
                  queue: false,
                  easing: 'linear',
                  complete: function () {
                    settings.bumpEdge();
                    move.up();
                  },
                },
              );
            },
            up: function () {
              $el.animate(
                { top: 0 },
                {
                  duration: (containerHeight / settings.speed) * 1000,
                  queue: false,
                  easing: 'linear',
                  complete: function () {
                    settings.bumpEdge();
                    move.down();
                  },
                },
              );
            },
          };

          getSizes();
          if (settings.horizontal) {
            move.right();
          }
          if (settings.vertical) {
            move.down();
          }
          // Make that shit responsive!
          $(window).resize(function () {
            getSizes();
          });
        });
      };
    })(window);

    $('.marquee').marqueeify({
      speed: 400,
    });

    $('.marquee2').marqueeify({
      speed: 300,
    });
  };

  useEffect(() => {
    if (animate) initEffect();
  }, [animate]);

  return (
    <div className="LogoBackgroundAnimate">
      <div className="marquee">
        <svg
          height="100%"
          viewBox="0 0 738 683"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M676.154 222.085H478.537C417.413 222.085 358.813 197.328 316.08 153.598C312.474 149.984 306.343 152.514 306.343 157.574V393.934C306.343 406.222 291.558 412.366 282.903 403.692L94.301 214.857C21.4567 141.852 73.205 17.1668 176.161 17.1668H426.608C467.358 17.1668 506.485 33.4302 535.334 62.3427L681.564 209.074C686.432 213.772 683.006 222.265 676.154 222.085Z"
            stroke="url(#paint0_radial_3924_39985)"
            strokeWidth="10"
            strokeMiterlimit="10"
          />
          <path
            d="M566.314 677.878H315.867C275.117 677.878 235.99 661.614 207.141 632.702L60.9115 486.151C56.0432 481.272 59.469 472.779 66.3207 472.779H263.578C324.702 472.779 383.302 497.535 426.035 541.266C429.641 544.88 435.771 542.35 435.771 537.29L436.132 300.93C436.132 288.642 450.917 282.498 459.572 291.172L640.782 472.779L647.994 480.007C720.838 553.011 669.27 677.878 566.314 677.878Z"
            stroke="#fff"
            strokeWidth="10"
            strokeMiterlimit="10"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3924_39985"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(372.078 212.441) scale(268.794 269.384)"
            >
              <stop stopColor="#FFD600" />
              <stop offset="1" stopColor="#FFC200" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="marquee2">
        <svg
          height="100%"
          viewBox="0 0 738 683"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M676.154 222.085H478.537C417.413 222.085 358.813 197.328 316.08 153.598C312.474 149.984 306.343 152.514 306.343 157.574V393.934C306.343 406.222 291.558 412.366 282.903 403.692L94.301 214.857C21.4567 141.852 73.205 17.1668 176.161 17.1668H426.608C467.358 17.1668 506.485 33.4302 535.334 62.3427L681.564 209.074C686.432 213.772 683.006 222.265 676.154 222.085Z"
            stroke="url(#paint0_radial_3924_39985)"
            strokeWidth="10"
            strokeMiterlimit="10"
          />
          <path
            d="M566.314 677.878H315.867C275.117 677.878 235.99 661.614 207.141 632.702L60.9115 486.151C56.0432 481.272 59.469 472.779 66.3207 472.779H263.578C324.702 472.779 383.302 497.535 426.035 541.266C429.641 544.88 435.771 542.35 435.771 537.29L436.132 300.93C436.132 288.642 450.917 282.498 459.572 291.172L640.782 472.779L647.994 480.007C720.838 553.011 669.27 677.878 566.314 677.878Z"
            stroke="#fff"
            strokeWidth="10"
            strokeMiterlimit="10"
          />
          <defs>
            <radialGradient
              id="paint0_radial_3924_39985"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(372.078 212.441) scale(268.794 269.384)"
            >
              <stop stopColor="#FFD600" />
              <stop offset="1" stopColor="#FFC200" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default LogoBackgroundAnimate;
