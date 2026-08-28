
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills.Db3KX98s.js","/cdn/shopifycloud/checkout-web/assets/c1/app.BKQYdj19.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor.Bi-3mRQs.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser.BPh2Xdws.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-policy.DnD1veXO.js","/cdn/shopifycloud/checkout-web/assets/c1/addresses-is-address-empty.CQ3L4cYN.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-setAddressErrors.K_K4IUTn.js","/cdn/shopifycloud/checkout-web/assets/c1/types-ShopPayInstallments.B3YZE422.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-mapper-load-recovery.DXK9rYed.js","/cdn/shopifycloud/checkout-web/assets/c1/receipt-eager-mappers.CMVXSpuf.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-previous.Ds37ickK.js","/cdn/shopifycloud/checkout-web/assets/c1/sections-shared.NZJsvbVS.js","/cdn/shopifycloud/checkout-web/assets/c1/consent-manager-shared.7I-N1lrd.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-extension-execution-errors.D5UD5rh2.js","/cdn/shopifycloud/checkout-web/assets/c1/extensions-rpc.DW1GJD2R.js","/cdn/shopifycloud/checkout-web/assets/c1/error-logger-report-graphql-error.C7VkLsFl.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-normalizeBuyerDetails.BWND_sLq.js","/cdn/shopifycloud/checkout-web/assets/c1/helpers-derivations.Cx_h6m-w.js","/cdn/shopifycloud/checkout-web/assets/c1/cvv-cvvBridge.DS5EwDYD.js","/cdn/shopifycloud/checkout-web/assets/c1/color-contrast-colorContrast.CYmi5fnB.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-browser.Cz_cxJpy.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate.CW6Ff8S7.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en.BGiwfs3z.js","/cdn/shopifycloud/checkout-web/assets/c1/OnePage.CJKX2V5F.js","/cdn/shopifycloud/checkout-web/assets/c1/components-DeliveryTransition.BY8DckiK.js","/cdn/shopifycloud/checkout-web/assets/c1/useShopPayButtonClassName.B8KyEPlW.js","/cdn/shopifycloud/checkout-web/assets/c1/crypto-constants.Cci8BlSR.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink.CP8HQwV5.js","/cdn/shopifycloud/checkout-web/assets/c1/BillingAddressForm.BFkyitvw.js","/cdn/shopifycloud/checkout-web/assets/c1/PhoneField.DjWD258V.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useCanChangeCompanyLocation.Dxy2nSgS.js","/cdn/shopifycloud/checkout-web/assets/c1/components-RedirectionNotice.module.Cncdgi7Y.js","/cdn/shopifycloud/checkout-web/assets/c1/Popover.C27pJ_Ub.js","/cdn/shopifycloud/checkout-web/assets/c1/Choice.BUCo5Bay.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-types.2PrlEFmb.js","/cdn/shopifycloud/checkout-web/assets/c1/Checkbox.CMAY5Am5.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal.Qq8AxvxE.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl.DxqgfrtS.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useEcpSpiDebugLog.emRf8eDr.js","/cdn/shopifycloud/checkout-web/assets/c1/CaptureEvents-ButtonWithRegisterWebPixel.CI_3GXF4.js","/cdn/shopifycloud/checkout-web/assets/c1/ShopPayLogo.BnqqzwMO.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout.Bmw-0f8d.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePostPurchase.FbbitQ29.js","/cdn/shopifycloud/checkout-web/assets/c1/Monorail-monorailMetric-wallets.DQpMLtuo.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-pay-installments-monorail.Wv-o0KVW.js","/cdn/shopifycloud/checkout-web/assets/c1/IncentiveBadge.dOzNMngr.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks.DTDOciaI.js","/cdn/shopifycloud/checkout-web/assets/c1/PendingShipping.BKrrk28a.js","/cdn/shopifycloud/checkout-web/assets/c1/useAddressMutationsWithNegotiation.BfKOZi5E.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentIcon.BHhzz-BH.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentLine.C8P_EUYe.js","/cdn/shopifycloud/checkout-web/assets/c1/Theme-ThemeOverride.By24qhLZ.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress.De-4nw13.js","/cdn/shopifycloud/checkout-web/assets/c1/payment-usePaymentExemptionReason.XneNCL3M.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayProgressIntercepts.BkeKfWkk.js","/cdn/shopifycloud/checkout-web/assets/c1/Section.y0TvmErO.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-SectionStyleOverride.CHQaCvA_.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner.CmoUV2Xl.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage.Fjeuus4C.js","/cdn/shopifycloud/checkout-web/assets/c1/StickyPayButton-StickyPayButton.module.DlQy_Lo6.js","/cdn/shopifycloud/checkout-web/assets/c1/PayButton-helpers.CJjve9_V.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-payment-button.BWh5m7pa.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-usePreselectSpi.SZTOuDl2.js","/cdn/shopifycloud/checkout-web/assets/c1/Switch.fX-xTSHM.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useAvailableShopPromotionDiscounts.JE6oVV02.js","/cdn/shopifycloud/checkout-web/assets/c1/checkout-as-guest-amazon-pay.DtSVON0H.js","/cdn/shopifycloud/checkout-web/assets/c1/Middot.CNdlEsS0.js","/cdn/shopifycloud/checkout-web/assets/c1/EstimatedDeliveryContent.BDHZBdGN.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodRateLabel.DCo0FAcw.js","/cdn/shopifycloud/checkout-web/assets/c1/shipping-methods-consolidated-included.C5BiZ_so.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingLines.DN6nvWHz.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown.ZivkQQfd.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal.fHQ4toP_.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector.DcLVVTbJ.js","/cdn/shopifycloud/checkout-web/assets/c1/TextArea.B82_qNiL.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown.CFih04Co.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList.DquUQ7kS.js"];
      var styles = ["/cdn/shopifycloud/checkout-web/assets/c1/assets/app.C61fwjfC.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/checkout-policy.CdXX_CXd.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/helpers.C3xTuzvt.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/OnePage.CNHfYFLR.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/DeliveryTransition.CxmS455s.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useAddressMutationsWithNegotiation.DPEapfiO.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Section.CU18S7Ap.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentLine.0ZuT82rY.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/StickyPayButton.3WRao8Y9.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PaymentIcon.CLVwzp6i.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayProgressIntercepts.CIy8uDiZ.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Choice.CP8QNAbt.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/IncentiveBadge.Dlnp55te.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/BillingAddressForm.BdwN7V1K.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Switch.Dq_6Ius6.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/useShopPayButtonClassName.CpHF4L7Q.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/PhoneField.uZEuHncj.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/Middot.D7Ujmshx.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/ShippingLines.LcqrKXE1.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/MerchandiseModal.D6OuIVjc.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/EstimatedDeliveryContent.B_THySFF.css","/cdn/shopifycloud/checkout-web/assets/c1/assets/RedirectionNotice.B8v_QGNW.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  