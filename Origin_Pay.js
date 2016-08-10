(function() {
    window.netBankTipsCode = "";
    window.addAgreementValiFun = null;
    window.addCCBAgreementValiFun = null;
    window.addCaptchaCodeValiFun = null;
    window.showCardValiFun = null;
    window.bankTipsOpen = null;
    window.removeShowCardValiFun = null;
    window.removeAgreementValiFun = null;
    window.removeCCBAgreementValiFun = null;
    window.removeCaptchaCodeValiFun = null;
    window.removeSmsCodeValiFun = null;
    window.addSmsCodeValiFun = null;
    window.addBankSmsCodeValiFun = null;
    window.addUPEditorValiFun = null
})();

function UPBaseRender() {}
UPBaseRender.prototype.render = function() {};
UPBaseRender.prototype.init = function() {};

function UPMerPayControlRender() {
    UPBaseRender.apply(this, arguments);
    UPMerPayControlRender.prototype = this;
    this.init()
}
UPMerPayControlRender.prototype.init = function() {};
UPMerPayControlRender.prototype.render = function(a) {
    this._param = a;
    if (a.target)
        if ("" != a.white && "" == a.black) a.target.show(), a.target.find(".mer-pay-ctrl-info-white").show(), a.target.find(".mer-pay-ctrl-info-white").html(a.white), a.target.find(".mer-pay-ctrl-info-black").hide();
        else {
            if ("" != a.black && "" == a.white) {
                a.target.show();
                a.target.find(".mer-pay-ctrl-info-black").html(a.black);
                a.target.find(".mer-pay-ctrl-info-black").show();
                window.CardInfoRequest.setBtnStatus(!1);
                a.target.find(".mer-pay-ctrl-info-white").hide();
                $("#lack-pay-reopen-upop-id").click(function(a) {
                    0 < $("#foreignCard").length && "true" == $("#foreignCard").val() ? $("#foreignCardForm").submit() : (a.preventDefault(), UPOP.reopenBankCard())
                });
                return
            }
            a.target.find(".mer-pay-ctrl-info-white").hide();
            a.target.find(".mer-pay-ctrl-info-black").hide();
            a.target.hide()
        }
        "true" == $("#cardDateExpired").val() && "CreditCard" == $("#cardType").val() && "false" == $("#reOpenCard").val() ? ($("#creditCard-expired-info").show(), $(".creditCard-expired-info a").click(function(a) {
        a.preventDefault();
        UPOP.reopenBankCard()
    })) : $("#creditCard-expired-info").hide()
};

function UPAgreementRender() {
    UPBaseRender.apply(this, arguments);
    this.TYPE = {
        NO_AGREEMENT: "NO_AGREEMENT",
        UNIONPAY_AGREEMENT: "UNIONPAY_AGREEMENT",
        BANK_AGREEMENT: "BANK_AGREEMENT",
        UNIONPAY_OR_BANK_AGREEMENT: "UNIONPAY_OR_BANK_AGREEMENT",
        BOTH_AGREEMENT: "BOTH_AGREEMENT"
    }
}
UPAgreementRender.prototype = new UPAgreementRender;
UPAgreementRender.prototype.init = function() {};
UPAgreementRender.prototype.render = function(a) {
    $("#isCheckAgreement").attr("checked", !0);
    2 == $(".agr a").length && ($(".agr a").eq(0).remove(), $(".Card_agr .agr").html($(".Card_agr .agr").html().replace("\u3001", "")));
    switch (a.type) {
        case this.TYPE.NO_AGREEMENT:
            $(".Card_agr").hide();
            break;
        case this.TYPE.UNIONPAY_AGREEMENT:
            $(".agr a").html($.getI18Text("msg_unionpay_agreement"));
            $(".agr a").attr("target", "_blank");
            "ru_RU" == UPOP.localeStr || "en_US" == UPOP.localeStr ? $(".agr a").attr("href", UPOP.PRE_PATH_URL +
                "/pages/misc/agree_" + UPOP.localeStr + ".html") : $(".agr a").attr("href", UPOP.PRE_PATH_URL + "/pages/misc/agree.html");
            $.setI18Text("agreement_onerror_paytips", $.getI18Text("agreement_onerror_paytips_org") + $.getI18Text("msg_unionpay_agreement"));
            break;
        case this.TYPE.BANK_AGREEMENT:
            $(".agr a").html(a.descName);
            $(".agr a").attr("target", "_blank");
            $(".agr a").attr("href", a.preURL + "/page/agreement/" + UPOP.localeStr + "/" + a.bankNo + a.cardType + ".html");
            $.setI18Text("agreement_onerror_paytips", $.getI18Text("agreement_onerror_paytips_org") +
                a.descName);
            break;
        case this.TYPE.UNIONPAY_OR_BANK_AGREEMENT:
            $(".agr a").html($.getI18Text("msg_agreement"));
            $(".agr a").attr("target", "_blank");
            $(".agr a").attr("href", a.preURL + "/page/agreement/" + UPOP.localeStr + "/" + a.bankNo + a.cardType + ".html");
            $.setI18Text("agreement_onerror_paytips", $.getI18Text("agreement_onerror_paytips_org") + $.getI18Text("msg_agreement"));
            break;
        case this.TYPE.BOTH_AGREEMENT:
            $(".agr a").replaceWith("<a>" + $.getI18Text("msg_unionpay_agreement") + "</a>\u3001<a>" + a.descName + "</a>"),
                $(".agr a").each(function(d, b) {
                    d == 0 ? $(b).click(function() {
                        $(this).attr("target", "_blank");
                        UPOP.localeStr == "ru_RU" || UPOP.localeStr == "en_US" ? $(this).attr("href", UPOP.PRE_PATH_URL + "/pages/misc/agree_" + UPOP.localeStr + ".html") : $(this).attr("href", UPOP.PRE_PATH_URL + "/pages/misc/agree.html")
                    }) : d == 1 && $(b).click(function() {
                        $(this).attr("target", "_blank");
                        $(this).attr("href", a.preURL + "/page/agreement/" + UPOP.localeStr + "/" + a.bankNo + a.cardType + ".html")
                    })
                }), $.setI18Text("agreement_onerror_paytips", $.getI18Text("agreement_onerror_paytips_org") +
                    $.getI18Text("msg_unionpay_agreement") + "\u3001" + a.descName)
    }
};

function UPMicroRender() {
    UPBaseRender.apply(this, arguments);
    this.init()
}
UPMicroRender.prototype = new UPBaseRender;
UPMicroRender.hideTipsArea = function() {
    $(".notice_fail").hide();
    $(".notice_alarm_blue").hide()
};
UPMicroRender.prototype.init = function() {
    this.TYPE = {
        unsupported: "unsupported",
        expired: "expired",
        using: "using",
        amountExceed: "amountExceed",
        merchantNotSupport: "merchantNotSupport",
        openSuccess: "openSuccess",
        initial: "initial",
        expired4open: "expired4open"
    };
    this.TIPS = {
        expired: $.getI18Text("micro_tips_expired"),
        using: $.getI18Text("micro_tips_using"),
        amountExceed: $.getI18Text("micro_tips_amountExceed"),
        expired4open: $.getI18Text("micro_tips_expired4open"),
        merchantNotSupport: $.getI18Text("micro_tips_merchantNotSupport"),
        microPayOpenTitle: $.getI18Text("micro_tips_microPayOpenTitle"),
        microPayOpenTips: $.getI18Text("micro_tips_microPayOpenTips"),
        initial: $.getI18Text("micro_tips_initial")
    }
};
UPMicroRender.prototype.preProcess = function(a) {
    if ("unsupported" == a.type || "true" == a.existsTips) return "Propay" == a.sourceType && ($(".notice_fail").hide(), $(".notice_alarm_blue").hide(), $(".getMoible a").removeClass("dn")), !1;
    "Propay" == a.sourceType && a.type == this.TYPE.expired ? (a.type = this.TYPE.expired4open, $(".notice_fail").hide(), $(".notice_alarm_blue").hide(), a.queryId && this.ajaxQueryID(a)) : a.queryId ? ($(".notice_fail").hide(), $(".notice_alarm_blue").hide(), this.ajaxQueryID(a)) : "initial" == a.type ? "Propay" ==
        a.sourceType && ($(".notice_fail").hide(), $(".notice_alarm_blue").hide()) : ($(".notice_fail").hide(), $(".notice_alarm_blue").hide());
    return !0
};
UPMicroRender.prototype.ajaxQueryID = function(a) {
    (new UPQueryBankBindCard).exec(a, UPOP.actionPreURL + "/queryBank.action?r=" + Math.random() + "&transNumber=" + UPOP.transNumber)
};
UPMicroRender.prototype.render = function(a) {
    if (this.preProcess(a)) switch (a.type) {
        case this.TYPE.initial:
            $("#cellPhoneNumberTip").html(this.TIPS.initial);
            $.setI18Text("mobilephone_onFocus_tips", this.TIPS.initial);
            $("#cellPhoneNumber").removeFormValidator({
                validatorGroup: "1"
            });
            $("#cellPhoneNumber").uptelephone().upcardTelephoneValidate().functionValidator({
                fun: function(a, b) {
                    window.UPOP.DisCount && window.UPOP.DisCount.phoneRefresh(a, b);
                    return !0
                },
                onError: ""
            });
            break;
        case this.TYPE.expired4open:
            $(".notice_fail").show();
            $(".notice_fail .fr").html(this.TIPS.expired4open);
            $(".getMoible a").addClass("dn");
            window.CardInfoRequest.setBtnStatus(!1);
            $(".notice_fail a").click(function() {
                UPOP.reopenBankCard()
            });
            this.hideUpoint();
            break;
        case this.TYPE.merchantNotSupport:
            $(".notice_fail").show();
            $(".notice_fail .fr").html(this.TIPS.merchantNotSupport);
            $(".getMoible a").addClass("dn");
            window.CardInfoRequest.setBtnStatus(!1);
            $(".notice_fail a").click(function() {
                UPOP.reopenBankCard()
            });
            this.hideUpoint();
            break;
        case this.TYPE.amountExceed:
            $(".notice_fail").show();
            $(".notice_fail .fr").html(this.TIPS.amountExceed);
            $(".getMoible a").addClass("dn");
            window.CardInfoRequest.setBtnStatus(!1);
            $(".notice_fail a").click(function() {
                UPOP.reopenBankCard()
            });
            this.hideUpoint();
            break;
        case this.TYPE.expired:
            $(".getMoible a").addClass("dn");
            $(".notice_alarm_blue").show();
            $(".notice_alarm_blue .fr").html(this.TIPS.expired);
            this.hideUpoint();
            break;
        case this.TYPE.using:
            $("#verifyPolicys_smsCode").val("false");
            $(".getMoible a").addClass("dn");
            $(".notice_alarm_blue").show();
            $(".notice_alarm_blue .fr").html(this.TIPS.using);
            $(".notice_alarm_blue a").click(function() {
                UPOP.reopenBankCard()
            });
            this.hideUpoint();
            break;
        case this.TYPE.openSuccess:
            $(".getMoible a").addClass("dn"), $(".notice_success .fr").html(this.TIPS.microPayOpenTitle), $("#verifyPolicys_smsCode").val("false"), this.hideUpoint()
    }
};
UPMicroRender.prototype.hideUpoint = function() {};
UPOP.refreshTopPointICON = function() {
    window.TopExchange && ("DebitCard" == $("#cardType").val() && "01030000" == $("#bankNo").val() ? ($(".integral_icon").hide(), $(".integral_icon_disable").show()) : ($(".integral_icon").show(), $(".integral_icon_disable").hide()))
};
UPMicroRender.showUpoint = function() {
    UPOP.refreshTopPointICON();
    0 < $(".order_u").length && $(".order_u").show()
};

function UPBaseSMS() {}

function UPBankSMS() {
    UPBaseSMS.apply(this, arguments)
}
UPBankSMS.prototype = new UPBaseSMS;
UPBankSMS.prototype.id = function(a) {
    this._id = a;
    return this
};
UPBankSMS.timeouter = null;
UPBankSMS.timeout_var = 0;
UPBankSMS.type = "cardPay";
UPBankSMS.PAY_CONSTANT = {
    timeout_total: 3E4,
    timeout_interval: 1E3,
    wait_interval: 1E3
};
UPBankSMS.PROCESSING_RESULT = {
    TimeOut: "smsTimeOut",
    OrderTimeOut: "6",
    Succeed: "0",
    Failed: "1",
    InProcess: "2",
    F57: "57",
    NoRecord: "3",
    ValidateFailed: "4"
};
UPBankSMS.prototype.init = function() {
    this.timeouter = UPBankSMS.timeouter = null;
    this.timeout_var = UPBankSMS.timeout_var = 0;
    this.PAY_CONSTANT = {
        timeout_total: 3E4,
        timeout_interval: 1E3,
        wait_interval: 1E3
    };
    this.PROCESSING_RESULT = {
        TimeOut: "smsTimeOut",
        OrderTimeOut: "6",
        Succeed: "0",
        Failed: "1",
        InProcess: "2",
        F57: "57",
        NoRecord: "3",
        ValidateFailed: "4"
    }
};
UPBankSMS.redirectResult = function(a) {
    clearTimeout(this.timeouter);
    $("#smsCode_ajax_loading").hide();
    var d = function(a) {
        return 2 < a.length ? a.substring(0, a.length - 2).replace(/\d/g, "*") + a.substring(a.length - 2) : a
    };
    if (a.code == this.PROCESSING_RESULT.Succeed) {
        if ("cardInfoVerify" == UPBankSMS.type) {
            window.verifyDisplay.show();
            UPOPUtils.sendMsgCallBack($("#btnGetCode"), $("#smsCodeTip"));
            return
        }
        if ("foreignPay" == UPBankSMS.type) {
            UPOPUtils.sendMsgCallBack($("#btnGetCode"), $("#smsCodeTip"), null, a.message);
            $("#display-mobile-text").html($("#areaCode").val() +
                "-" + d($("#cellPhoneNumber").val().replace(/[ ]/g, "")));
            $("#display-mobile-id").show();
            $("#areaCode-phonenumber-id").hide();
            $("#phoneNumber").val($("#cellPhoneNumber").val().replace(/[ ]/g, ""));
            return
        }
        $.formValidator.setTipState($("#smsCode").get(0), "onCorrect", $.getI18Text("smsCode_success_tips"));
        $("#smsCodeTip").find("div").addClass("txt_success")
    } else a.code == this.PROCESSING_RESULT.TimeOut ? $.formValidator.setTipState($("#smsCode").get(0), "onError", a.message) : a.code == UPBankSMS.PROCESSING_RESULT.ValidateFailed ?
        $.formValidator.setTipState($("#cellPhoneNumber").get(0), "onError", a.message) : a.message instanceof Array ? window.verifyDisplay.error(a.message) : $.formValidator.setTipState($("#smsCode").get(0), "onError", a.message);
    $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
    $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget"))
};
UPBankSMS.timeCountDown = function() {
    this.timeout_var + this.PAY_CONSTANT.timeout_interval > this.PAY_CONSTANT.timeout_total ? this.redirectResult({
        code: UPBankSMS.PROCESSING_RESULT.Failed,
        message: $.getI18Text("system_error_reget")
    }) : (this.timeout_var += this.PAY_CONSTANT.timeout_interval, this.timeouter = setTimeout("UPBankSMS.timeCountDown()", this.PAY_CONSTANT.timeout_interval))
};
UPBankSMS.check = function() {
    UPBankSMS.timeout_var + UPBankSMS.PAY_CONSTANT.timeout_interval > UPBankSMS.PAY_CONSTANT.timeout_total ? UPBankSMS.redirectResult({
        code: UPBankSMS.PROCESSING_RESULT.Failed,
        message: $.getI18Text("system_error_reget")
    }) : UPService.send(UPBankSMS._url, "text", {
        queryId: UPBankSMS._qid,
        phoneNumber: UPBankSMS._phoneNumber
    }, {
        onSuccess: function(a) {
            try {
                var d = $.parseJSON(a),
                    b = d.success;
                d.qid && (UPBankSMS._qid = d.qid);
                d.code == UPBankSMS.PROCESSING_RESULT.InProcess ? setTimeout("UPBankSMS.check()",
                    UPBankSMS.PAY_CONSTANT.wait_interval) : "57" == d.code && !b ? ("cardPay" == UPBankSMS.type ? ("true" == $("#fromBankOpenCard").val() && $(".notice_success").hide(), "true" == $("#authronization").val() ? $(".notice_alarm").show() : ($("#notice_fail_msg").html(d.message), $(".notice_fail").show())) : "true" == $("#authronization").val() ? ($(".notice_alarm_blue").hide(), $(".notice_alarm").show()) : ($(".notice_alarm_blue").hide(), $("#notice_fail_msg").html(d.message), $(".notice_fail").show()), $("#btnCardPay").attr("disabled", !0).addClass("btn_blue_dis"),
                    $("#smsCode_ajax_loading").hide(), clearTimeout(UPBankSMS.timeouter)) : UPBankSMS.redirectResult(d)
            } catch (c) {
                UPBankSMS.redirectResult({
                    code: UPBankSMS.PROCESSING_RESULT.Failed,
                    message: $.getI18Text("system_error_reget")
                })
            }
        },
        onFail: function() {
            UPBankSMS.redirectResult({
                code: UPBankSMS.PROCESSING_RESULT.Failed,
                message: $.getI18Text("system_error_reget")
            })
        }
    }, !0)
};
UPBankSMS.prototype.exec = function(a, d, b, c) {
    UPBankSMS._qid = a.qid;
    UPBankSMS._phoneNumber = a.phoneNumber;
    UPBankSMS._url = d;
    this.init();
    try {
        c && "function" == typeof c && c(this)
    } catch (f) {}
    UPBankSMS.type = b;
    UPBankSMS.timeCountDown();
    UPBankSMS.check()
};

function getCurrentCertifyID() {
    var a = $(".idsort_item span").html(),
        d = "";
    $(".idsort_list li").each(function() {
        $("." + $(this).attr("certID")).hide();
        $(this).text() == a && (d = $(this).attr("certID"))
    });
    return d
}

function cardPaySubmitonSuccess() {
    if (0 < $("#upoint_display").length && 0 < $("#upoint").length) {
        if (!$(".order_u_info").is(":hidden")) return $("html,body").animate({
            scrollTop: $(".order_main").offset().top
        }, 500), !1;
        var a = $("#upoint_display").val() * UPOP.currencyIndexMIN;
        if (Math.round(a) < $("#upointMinValue").val()) return $(".order_u_info").addClass("txt_error").show().html($.getI18Text("paySuccess_fastReg_udikou") + $("#upointMinValue").val() + $.getI18Text("paySuccess_fastReg_upoint")), $("html,body").animate({
                scrollTop: $(".order_main").offset().top
            },
            500), !1;
        $("#upoint").val(Math.round($("#upoint_display").val() * UPOP.currencyIndexMIN))
    } else 0 < $("#upoint_display").length && (0 < $("#upoint").length && $("#upoint_display").is(":hidden")) && $("#upoint").val("0");
    if (0 < $("#discount-display").length && window.UPOP.DisCount && !1 == window.UPOP.DisCount.valiSubmit()) return !1;
    var d;
    0 < $("#cellPhoneNumber").length && (d = $("#cellPhoneNumber").val().replace(/[ ]/g, ""));
    $("#cellPhoneNumber").is(":hidden") || $("#phoneNumber").val(d);
    $("#captchaCodeTip").hide();
    if ("pad" != UPOP.acpAgent &&
        (10 == window.upeditoratm.osBrowser || 11 == window.upeditoratm.osBrowser)) {
        try {
            var b = addUPEditorValiFun.genSeedCode();
            if (!b) return !1;
            var c = window.upeditorResultMachine;
            $("#machineInfo").val(c.cypher)
        } catch (f) {}
        addUPEditorValiFun.exec() && ($("#cardPay").unbind(), $("#cardPay").submit())
    }
    try {
        b = addUPEditorValiFun.genSeedCode();
        if (!b) return !1;
        c = upeditorMachineInfo.machineInfo(b);
        $("#machineInfo").val(c.cypher)
    } catch (e) {}
    return addUPEditorValiFun.exec()
}

function cardPaySubmitonError() {
    !$("#expireYear").is(":hidden") && ("" == $("#expireYear").val() || "" == $("#expireMonth").val()) && $.formValidator.setTipMsg($("#expireMonthTip").get(0), "onError", $.getI18Text("cvn2_onerror"));
    0 < $("#captchaCode").length && !$("#captchaCode").is(":hidden") && $.formValidator.areaIsValid("1", [$("#captchaCode").get(0)]) && $("#captchaCodeTip").hide();
    addUPEditorValiFun.exec();
    return !1
}

function fetchCardExtraInfo(a, d) {
    window.CardInfoRequest.start(CardInfoRequest.REQ_QUERY_BANKCARD_INFO);
    UPService.send(a + "/fetchCardExtraInfo.action?r=" + Math.random(), "text", {
        bindId: $("#bindId").val(),
        transNumber: d
    }, {
        onSuccess: function(a) {
            try {
                var c = $.parseJSON(a);
                $("#showCaptcha").val(c.showCaptcha);
                $("#protocolVersion").val(c.protocolVersion);
                $("#defaultOpen").val(c.defaultOpen);
                $("#smsVerifyEnabled").val(c.smsVerifyEnabled);
                $("#authronization").val(c.authronization);
                $("#cardDateExpired").val(c.dateExpired);
                $("#foreignCardForm_cardNumber").val($(".bindId").val());
                $("#foreignCard").val(c.foreignCard);
                $("#bankSmsType").val(c.bankSmsType);
                $("#bankActivatePhoneNumberDisplay").val("");
                $(".getMoible span").html(c.phoneNumberDisplay);
                c.amoutTips ? $("#bank_limit_count_tips").html("<span></span>" + c.amoutTips).show() : $("#bank_limit_count_tips").html("").hide();
                (new UPMerPayControlRender).render({
                    white: c.merchantPayWhiteTip,
                    black: c.payBanTip,
                    target: $("#mer-pay-ctrl-info")
                });
                $("#aggrementType").val(c.agreementType);
                (new UPAgreementRender).render({
                    type: c.agreementType,
                    descName: c.agreementDesc,
                    bankNo: $("#bankNo").val(),
                    cardType: $("#cardType").val(),
                    preURL: UPOP.preURL
                });
                c.showCCBAggrement ? ($("#showCCBAggrement").val("true"), addCCBAgreementValiFun()) : removeCCBAgreementValiFun();
                "CreditCard" == $("#cardType").val() && !1 != c.supportInstalment ? (UPInstallmentRender.refresh({
                    bankNo: $("#bankNo").val()
                }), $("#instalmentOptionsAble").val("true")) : (UPInstallmentRender.remove(), $("#instalmentOptionsAble").val("false"));
                window.MobileDisplayMode.init({
                    mobileDisplayMode: c.mobileDisplayMode
                });
                UPOP.refreshTopPointICON();
                try {
                    var d = c.openVerifyFactor,
                        e;
                    for (e in d) $("#verifyPolicys_" + e).val(d[e]);
                    UPOPUtils.trySend && clearInterval(UPOPUtils.trySend);
                    $("#btnGetCode").val($.getI18Text("smsCode_freeGet"));
                    $("#smsCodeTip").find("div").removeClass("txt_success").html("");
                    (new UPMicroRender).render({
                        type: c.restrictPayDisplay,
                        queryId: c.restrictPayInfo.queryId,
                        sourceType: $("#initSourceType").val(),
                        existsTips: $("#existsTips").val()
                    });
                    "MOBILE_AND_SMSCODE" == $("#mobileDisplayMode").val() ? "true" == $("#verifyPolicys_smsCode").val() ?
                        ($("#smsCodeTitle").html($.getI18Text("smsBankCode_name")), removeSmsCodeValiFun(), addBankSmsCodeValiFun()) : ($("#smsCodeTitle").html($.getI18Text("smsCode_name")), removeSmsCodeValiFun(), addSmsCodeValiFun()) : (removeSmsCodeValiFun(), $("#cardPay_all_need").hide())
                } catch (g) {}
                window.CardInfoRequest.complete(CardInfoRequest.REQ_QUERY_BANKCARD_INFO)
            } catch (j) {
                window.CardInfoRequest.complete(CardInfoRequest.REQ_QUERY_BANKCARD_INFO)
            }
        },
        onFail: function() {
            window.CardInfoRequest.complete(CardInfoRequest.REQ_QUERY_BANKCARD_INFO)
        }
    }, !0)
}

function cardPayPhoneTips() {
    function a() {
        !1 == b && ($(".mb_dir").hide(), window.clearInterval(d))
    }
    var d = null,
        b = !1;
    $(".mbtips").mouseover(function() {
        0 < $("#cancelmobileid").length && !$("#cancelmobileid").is(":hidden") ? $(".mb_dir").css("left", "315px") : $(".mb_dir").css("left", "225px");
        $(".mb_dir").show().css("visibility", "hidden");
        setTimeout(function() {
            $(".mb_dir").css("visibility", "visible")
        }, 1);
        window.clearInterval(d)
    }).mouseout(function() {
        d = window.setInterval(a, 500)
    });
    $(".mb_dir").mouseover(function() {
        b = !0
    }).mouseout(function() {
        b = !1
    })
}
addUPEditorValiFun = function() {
    var a = function() {
        return $("#vc_key_seed").val()
    };
    return {
        genSeedCode: a,
        exec: function() {
            var d = !0;
            if ("true" == $("#skipPwd").val()) return d;
            if ("pad" == UPOP.acpAgent) 0 < $("#pad_atm_password").length && !1 == $("#pad_atm_password").is(":hidden") ? 6 == $("#pad_atm_password").html().length ? ($(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips")), d = !0) : ($(".CardPwdText").addClass("txt_error").html($.getI18Text("upeditor_msg_password_05")), d = !1) : 0 < $("#padCvn2").length && !1 ==
                $("#padCvn2").is(":hidden") && (3 == $("#padCvn2").val().length ? ($(".CardCvnText").removeClass("txt_error").html($.getI18Text("upop_cvn2_tips")), $("#cvn2").val(window.padPassword.userCvn2Encrypt($("#padCvn2").val())), d = !0) : ($(".CardCvnText").addClass("txt_error").html($.getI18Text("upop_cvn2_tips")), $("#padCvn2").addClass("txterror"), d = !1));
            else if (10 == window.upeditoratm.osBrowser || 11 == window.upeditoratm.osBrowser) {
                if ("true" != $("#foreignMerchant").val() && upeditorcvn && !$(".cvnobject").is(":hidden") && upeditorcvn.upeDownText !=
                    $.getI18Text("upop_upedit_update_tips")) {
                    var b = a();
                    if (!b) return !1;
                    d = window.upeditorcvnResult;
                    d.isError() ? ($(".CardCvnText").addClass("txt_error").html(d.errMsg()), d = !1) : ($("#cvn2").val(d.cypher), d = !0)
                }
                if (upeditoratm && !$(".debitCard").is(":hidden") && upeditoratm.upeDownText != $.getI18Text("upop_upedit_update_tips")) {
                    b = a();
                    if (!b) return !1;
                    b = window.upeditoratmResult;
                    b.isError() ? ($(".CardPwdText").addClass("txt_error").html(b.errMsg()), d = !1) : ($("#atmPassword").val(b.cypher), d = d && !0)
                }
            } else {
                if ("true" != $("#foreignMerchant").val() &&
                    upeditorcvn && !$(".cvnobject").is(":hidden") && upeditorcvn.checkInstall() && upeditorcvn.upeDownText != $.getI18Text("upop_upedit_update_tips")) {
                    b = a();
                    if (!b) return !1;
                    d = upeditorcvn.result(b);
                    d.isError() ? ($(".CardCvnText").addClass("txt_error").html(d.errMsg()), d = !1) : ($("#cvn2").val(d.cypher), d = !0)
                }
                if (upeditoratm && !$(".ocx_atm").is(":hidden") && upeditoratm.checkInstall() && upeditoratm.upeDownText != $.getI18Text("upop_upedit_update_tips")) {
                    b = a();
                    if (!b) return !1;
                    b = upeditoratm.result(b);
                    b.isError() ? ($(".CardPwdText").addClass("txt_error").html(b.errMsg()),
                        d = !1) : ($("#atmPassword").val(b.cypher), d = d && !0)
                }
            }
            return d
        }
    }
}();

function cardPaySMSCodeSend(a, d) {
    if (function() {
            try {
                if ("NewCard" == $("#sourceType").val() && "cardPay" == $("#PageEname").val()) {
                    if ("false" == $("#smsVerifyEnabled").val()) return !1;
                    if ("true" == $("#reOpenCard").val() && "false" == $("#verifyPolicys_smsCode").val() || "2.0" == $("#protocolVersion").val() || "false" == $("#defaultOpen").val() && "true" == $("#authronization").val() && "false" == $("#verifyPolicys_smsCode").val()) return !0
                }
            } catch (a) {}
            return !1
        }()) {
        window.verifyDisplay.clear();
        removeSmsCodeValiFun();
        removeCaptchaCodeValiFun();
        var b = $.formValidator.getInitConfig("1");
        if (!$.formValidator.areaIsValid("1", b.validObjects, !1)) return !$("#expireYear").is(":hidden") && ("" == $("#expireYear").val() || "" == $("#expireMonth").val()) && $.formValidator.setTipMsg($("#expireMonthTip").get(0), "onError", $.getI18Text("cvn2_onerror")), addUPEditorValiFun.exec(), addSmsCodeValiFun(), addCaptchaCodeValiFun(), !1;
        addSmsCodeValiFun();
        addCaptchaCodeValiFun();
        if (!1 == addUPEditorValiFun.exec()) return !1;
        var c = {};
        $.each($("#cardPay").serializeArray(), function(a,
            e) {
            c[e.name] = e.value
        });
        c.transNumber = d;
        c.phoneNumber = $("#cellPhoneNumber").val().replace(/[ ]/g, "");
        "Propay" == $("#initSourceType").val() ? c.bindId = $("#bindId").val() : c.cardNumber = $("#cardNumber").val();
        $("#btnGetCode").addClass("yzm_btn_dis");
        $("#btnGetCode").val($.getI18Text("smsCode_alreadySend")).attr("disabled", "disabled");
        postUrl = a + "/ajax/cardInfoVerify.action?r=" + Math.random();
        UPService.send(postUrl, "text", c, {
            onSuccess: function(b) {
                b = $.parseJSON(b);
                b.success ? (new UPBankSMS).exec({
                        qid: b.qid
                    }, a +
                    "/ajax/cardInfoVerifyQuery.action?r=" + Math.random() + "&transNumber=" + d, "cardInfoVerify",
                    function() {}) : ($("#smsCode_ajax_loading").hide(), b.message instanceof Array ? window.verifyDisplay.error(b.message) : $.formValidator.setTipState($("#smsCode").get(0), "onError", b.message), $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled"), $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget")))
            },
            onFail: function() {
                "true" == $("#verifyPolicys_smsCode").val() && $("#smsCode_ajax_loading").hide();
                $.formValidator.setTipState($("#smsCode").get(0),
                    "onError", $.getI18Text("smsCode_error"));
                $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget"))
            }
        }, !0)
    } else {
        if ("NewCard" == $("#sourceType").val() || "PayAndOpenCard" == $("#sourceType").val()) {
            if (!$.formValidator.areaIsValid("1", [$("#cellPhoneNumber").get(0)])) return !1;
            c = {
                transNumber: d,
                cardNumber: $("#cardNumber").val(),
                phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, ""),
                sourceType: $("#sourceType").val()
            };
            "Propay" == $("#initSourceType").val() &&
                (c.bindId = $("#bindId").val())
        } else if ("Propay" == $("#sourceType").val())
            if ("true" == $("#verifyPolicys_smsCode").val() && !$("#cellPhoneNumber").is(":hidden")) {
                if (!$.formValidator.areaIsValid("1", [$("#cellPhoneNumber").get(0)])) return !1;
                c = {
                    transNumber: d,
                    bindId: $("#bindId").val(),
                    phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, ""),
                    sourceType: $("#sourceType").val()
                }
            } else c = {
                transNumber: d,
                bindId: $("#bindId").val(),
                sourceType: $("#sourceType").val()
            };
        else if ("Litepay" == $("#initSourceType").val())
            if ("true" ==
                $("#verifyPolicys_smsCode").val() && !$("#cellPhoneNumber").is(":hidden")) {
                if (!$.formValidator.areaIsValid("1", [$("#cellPhoneNumber").get(0)])) return !1;
                c = {
                    transNumber: d,
                    cardNumber: $("#cardNumber").val(),
                    phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, ""),
                    sourceType: $("#sourceType").val()
                }
            } else c = {
                transNumber: d,
                cardNumber: $("#cardNumber").val(),
                phoneNumber: "",
                sourceType: $("#sourceType").val()
            };
        $("#btnGetCode").addClass("yzm_btn_dis");
        $("#btnGetCode").val($.getI18Text("smsCode_alreadySend")).attr("disabled",
            "disabled");
        "true" == $("#verifyPolicys_smsCode").val() ? ($("#smsCode_ajax_loading").show(), c.messageType = "trade", postUrl = a + "/ajax/bankSMS.action?r=" + Math.random()) : postUrl = a + "/ajax/cardPaySMS!send.action?r=" + Math.random();
        UPService.send(postUrl, "text", c, {
            onSuccess: function(b) {
                var b = $.parseJSON(b),
                    e = b.success;
                if ($("#verifyPolicys_smsCode").val() == "true")
                    if (e) {
                        $("#SMSBankCode_QID").val(b.message);
                        (new UPBankSMS).exec({
                                qid: $("#SMSBankCode_QID").val()
                            }, a + "/ajax/checkBankSms.action?r=" + Math.random() + "&transNumber=" +
                            d, "cardPay")
                    } else {
                        $("#smsCode_ajax_loading").hide();
                        $.formValidator.setTipState($("#smsCode").get(0), "onError", b.message);
                        $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                        $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget"))
                    }
                else if (e) {
                    UPOPUtils.sendMsgCallBack($("#btnGetCode"), $("#smsCodeTip"));
                    $(".notice_fail").hide();
                    $(".notice_alarm").hide();
                    $("#fromBankOpenCard").val() == "true" && $(".notice_success").show()
                } else {
                    $.formValidator.setTipState($("#smsCode").get(0), "onError",
                        b.message);
                    $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                    $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget"))
                }
            },
            onFail: function() {
                $("#verifyPolicys_smsCode").val() == "true" && $("#smsCode_ajax_loading").hide();
                $.formValidator.setTipState($("#smsCode").get(0), "onError", $.getI18Text("smsCode_error"));
                $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                $("#btnGetCode").val($.getI18Text("paySuccess_fastReg_reget"))
            }
        }, !0)
    }
}
(function() {
    var a = function(a) {
        return 11 == a.length ? a.substring(0, 3) + "*****" + a.substring(a.length - 3) : a
    };
    return window.verifyDisplay = {
        show: function() {
            0 == $("#display-mobile-id").length && ($(".CardMobile > .list_right").hide(), $(".CardMobile > .list_right").after('<div class="list_right" id="display-mobile-id"><div class="displayMobile"><span  id="display-mobile-text"></span><span class="txt_success display_mobile_send_success_en_US" style="display: inline-block;" id="display-mobile-send-success"></span></div></div>'),
                $("#display-mobile-text").html(a($("#cellPhoneNumber").val().replace(/[ ]/g, ""))), $("#display-mobile-id").show(), $("#phoneNumber").val($("#cellPhoneNumber").val().replace(/[ ]/g, "")));
            if (0 == $("#display-upeditor-id").length && ($(".cvnobject").is(":hidden") || ($(".CardCVN2 > .list_right").hide(), $("#_ocx_cvn2").hide(), $(".CardCVN2 > .list_right").after('<div class="list_right" id="display-upeditor-id"><div class="displayMobile"><span  id="display-upeditor-text"></span><span class="txt_success display_mobile_send_success_en_US" style="display: inline-block;" id="display-upeditor-send-success"></span></div></div>'),
                    $("#display-upeditor-text").html("***"), $("#display-upeditor-id").show()), !$(".debitCard").is(":hidden"))) $(".debitCard > .list_right").hide(), $("#_ocx_password").hide(), $(".debitCard > .list_right").after('<div class="list_right" id="display-upeditor-id"><div class="displayMobile"><span  id="display-upeditor-text"></span><span class="txt_success display_mobile_send_success_en_US" style="display: inline-block;" id="display-upeditor-send-success"></span></div></div>'), $("#display-upeditor-text").html("******"),
                $("#display-upeditor-id").show()
        },
        reset: function() {
            0 < $("#display-mobile-id").length && ($("#display-mobile-id").remove(), $(".CardMobile > .list_right").show());
            if (0 < $("#display-upeditor-id").length && ($("#display-upeditor-id").remove(), "true" == $("#verifyPolicys_cvn2").val() && ($(".CardCVN2 > .list_right").show(), $("#_ocx_cvn2").show()), "true" == $("#verifyPolicys_password").val())) $(".debitCard > .list_right").show(), $("#_ocx_password").show()
        },
        error: function(a) {
            $("#notice_boxerror_ur").empty();
            $(".notice_boxerror").show();
            for (var b = ['<ul class="errorMessage">'], c = 0; c < a.length; c++) b.push("<li><span>" + a[c] + "</span></li>");
            b.push("</ul>");
            $("#notice_boxerror_ur").append(b.join(""))
        },
        clear: function() {
            $("#notice_boxerror_ur").empty();
            $(".notice_boxerror").hide()
        }
    }
})();
(function() {
    var a = function() {
            return !$.isEmptyObject(e)
        },
        d, b, c, f, e = {},
        g = !0;
    window.CardInfoRequest = {
        REQ_QUERY_TOP_EXCHANGE: "query-top-exchange-result",
        REQ_QUERY_TOP_EXCHANGE_HREF: "query-top-exchange-href",
        REQ_QUERY_BANKCARD_INFO: "query-bankcard-info-result",
        init: function(a) {
            d = a;
            b = '<img src="' + d + '/images/global/loading_sms.gif">';
            c = $("#loading-card-info-request");
            f = $(b)
        },
        start: function(b) {
            a() || (f.appendTo(c), "query-top-exchange-href" != b && (g = !0), $("#btnGetCode").addClass("yzm_btn_dis").attr("disabled", !0), $("#btnCardPay").addClass("btn_blue_dis").attr("disabled", !0));
            e[b] = 1;
            return e
        },
        complete: function(b) {
            return e[b] ? (delete e[b], a() || (f.remove(), g && ($("#btnGetCode").removeClass("yzm_btn_dis").attr("disabled", !1), $("#btnCardPay").removeClass("btn_blue_dis").attr("disabled", !1))), e) : !1
        },
        allComplete: function() {
            e = {}
        },
        isRequesting: a,
        setBtnStatus: function(a) {
            (g = a) ? ($("#btnGetCode").removeClass("yzm_btn_dis").attr("disabled", !1), $("#btnCardPay").removeClass("btn_blue_dis").attr("disabled", !1)) : ($("#btnGetCode").addClass("yzm_btn_dis").attr("disabled", !0), $("#btnCardPay").addClass("btn_blue_dis").attr("disabled", !0))
        }
    }
})();
(function() {
    function a() {
        return a.instance
    }
    var d = '<div class="content-tips-smscode" id="content-tips-smscode"><span></span>' + $.getI18Text("micropay_no_sms_code_msg") + "</div>";
    a.prototype = {
        _init: function(a) {
            this.settings = $.extend({}, a);
            a && a.mobileDisplayMode && $("#mobileDisplayMode").val(a.mobileDisplayMode);
            "MOBILE_AND_SMSCODE" != $("#mobileDisplayMode").val() ? 0 < $("#content-tips-smscode").length ? ($("#content-tips-smscode-id").show(), $("#content-tips-security").hide(), $("#content-tips-smscode").show(),
                $("#cardPay_all_need").hide()) : ($("#content-tips-smscode-id").html($(d)).show(), $("#content-tips-security").hide()) : ($("#content-tips-smscode-id").hide(), window.upeditorMachineInfo && window.upeditorMachineInfo.checkInstall() && $("#content-tips-security").show(), "true" == $("#existsTips").val() ? $("#cardPay_all_need").hide() : $("#cardPay_all_need").show());
            return this
        },
        _show: function(a) {
            this.settings = $.extend({}, a);
            "MOBILE_AND_SMSCODE" != $("#mobileDisplayMode").val() && (0 < $("#content-tips-smscode").length ?
                ($("#content-tips-smscode-id").show(), $("#content-tips-security").hide(), $("#content-tips-smscode").show()) : ($("#content-tips-smscode-id").html($(d)).show(), $("#content-tips-security").hide()), $("#cardPay_all_need").show(), "true" == $("#verifyPolicys_smsCode").val() ? addBankSmsCodeValiFun() : addSmsCodeValiFun());
            return this
        },
        _hide: function(a) {
            this.settings = $.extend({}, a);
            "MOBILE_AND_SMSCODE" != $("#mobileDisplayMode").val() ? ($("#cardPay_all_need").hide(), removeSmsCodeValiFun()) : ($("#content-tips-smscode-id").hide(),
                window.upeditorMachineInfo && window.upeditorMachineInfo.checkInstall() && $("#content-tips-security").show());
            return this
        }
    };
    a.instance = new a;
    a.show = function(b) {
        return a.instance._show(b)
    };
    a.hide = function(b) {
        return a.instance._hide(b)
    };
    a.init = function(b) {
        return a.instance._init(b)
    };
    window.MobileDisplayMode = a
})();
(function() {
    var a = function(a, b) {
            return a.replace(/\{([^}]+)\}/ig, function(a, c) {
                return null != b[c] && void 0 != b[c] ? b[c] : a
            })
        },
        d = !1,
        b = {
            "INSTALLMENT-INIT-SHOW": '            <div class="install-box-tips dn" id="install-box-tips">{installment_msg}<span></span></div>            <div class="installment-box-init" id="installment-box">                <div class="installment-title">                    <label for="installment-pay-fenqi"><input name="installment-pay-fenqi" type="checkbox"  class="" id="installment-pay-fenqi" value="false"/>{installment_title}</label>                     <a id="installment-rule-pop-href" >{installment_rule_title}</a> <span id="installment-rule-pop" ></span>                    <em>{installment_title_tips}</em>                </div><div class="clear"></div>            </div>',
            "INSTALLMENT-SHOW": '            <div class="install-box-tips dn" id="install-box-tips">\u60a8\u7684\u5b9e\u4ed8\u6b3e\u91d1\u989d\u5df2\u66f4\u65b0\uff0c\u8bf7\u91cd\u65b0\u9009\u62e9\u5206\u671f\u4ed8\u6b3e\u53ca\u5177\u4f53\u671f\u6570<span></span></div>            <div class="installment-box" id="installment-box">                <div class="installment-title">                    <label for="installment-pay-fenqi"><input name="installment-pay-fenqi" type="checkbox"  class="" id="installment-pay-fenqi" value="false"/>{installment_title}</label>                     <a id="installment-rule-pop-href" >{installment_rule_title}</a> <span id="installment-rule-pop" ><div id="installment-rule-id" class="installment-rule">{installment-rule-content}</div></span>                    <em>{installment_title_tips}</em>                </div><div class="clear"></div>                {installment-select-url}                <div class="installment-select" id="installment-select" >                    <span class="select-text" id="installment-select-text">                        {FIRST-INSTALLMENT-ITEM}                    </span>                    <span class="select-text" id="installment-total-amount">                        {INSTALLMENT-TOTAL-AMOUNT}                    </span>                </div>            </div>',
            "INSTALLMENT-SELECT": '                <ul class="installment-item" id="installment-item">                {INSTALLMENT-ITEM-LIST}                </ul>',
            "INSTALLMENT-TOTAL-AMOUNT": "{installmentTotalAmount}<font>{totalAmountDisplay}</font> {currency} = {installmentRealAmount}<font>{orderAmount}</font> {currency} + {installmentFeeDisplay}<font>{feeDisplay}</font> {currency}",
            "INSTALLMENT-ITEM-LI-ALLINFIRST-ITEAM": "{installment_first}<font>{firstDisplay}</font> {currency}\uff0c{installment_lastAverage}<font>{averageDisplay}</font> {currency}<span></span>",
            "INSTALLMENT-ITEM-LI-AVERAGE-ITEAM": "{installment_average}<font>{averageDisplay}</font> {currency}<span></span>",
            "INSTALLMENT-ITEM-LI-ALLINFIRST": '<li class="installment-item-li" orderAmount="{orderAmount}" feeType="{feeType}" periods="{periods}" installment_fee="{installment_fee}" feeDisplay="{feeDisplay}" currency="{currency}" installment_feeRate="{installment_feeRate}" feeRateDisplay="{feeRateDisplay}%" installment_first="{installment_first}" firstDisplay="{firstDisplay}" installment_lastAverage="{installment_lastAverage}" averageDisplay="{averageDisplay}"><font>{periods}</font> {installment_term}</li>',
            "INSTALLMENT-ITEM-LI-AVERAGE": '<li class="installment-item-li" orderAmount="{orderAmount}" feeType="{feeType}" periods="{periods}" installment_fee="{installment_fee}" feeDisplay="{feeDisplay}" currency="{currency}" installment_feeRate="{installment_feeRate}" feeRateDisplay="{feeRateDisplay}%" installment_average="{installment_average}" averageDisplay="{averageDisplay}"><font>{periods}</font> {installment_term}</li>',
            "INSTALLMENT-RULE-CONTENT-TD": '<td style="border:1px #e0dcdb solid; text-align:center;" class="installment-rule-td"> <font>{periods}</font>{installment_term}</td>                                           <td style="border:1px #e0dcdb solid; text-align:center;" class="installment-rule-td"> <font>{feeRateDisplay}</font>%</td>',
            "INSTALLMENT-RULE-CONTENT": '<tr >                                            <td style="border:1px #e0dcdb solid; text-align:center;" rowspan="{ROW-NUMBER}"><div >{BANK_IMAGE}</div></td>                                                {INSTALLMENT-RULE-CONTENT-TD-FIRST}                                                <td style="border:1px #e0dcdb solid; text-align:center;" rowspan="{ROW-NUMBER}"><div>{INSTALLMENT-STYLE}</div></td>                                                <td style="border:1px #e0dcdb solid; text-align:center;" rowspan="{ROW-NUMBER}"><div>{installment_tangible}<font>{payLimitAmountDisplay}</font>{currency}{installment_tangible_up}</div></td>                                            </tr>                                            {INSTALLMENT-RULE-CONTENT-TD-OTHERS}',
            "INSTALLMENT-STYLE-ALLINFIRST": $.getI18Text("installment_style_allinfrist"),
            "INSTALLMENT-STYLE-AVERAGE": $.getI18Text("installment_style_average"),
            "INSTALLMENT-RULE": '<div id="installment-rule-div" class="fenqi_info">                                    <div id="fenqi_con"><span></span>                                                <h2>{installment_return_rule}</h2>                                                <div>{installment_return_rule_tips}</div>                                                <h2>{installment_cancel}</h2>                                                <div>{installment_cancel_tips}</div>                                            </div>                            </div>'
        };
    window.UPInstallmentRender = {
        init: function(c) {
            if (c.installParam && 0 != c.installParam.length) {
                var f = "",
                    e = "",
                    g = "",
                    j = "",
                    k = "",
                    o = c.installParam.length,
                    l = "",
                    m, h = {
                        installment_term: $.getI18Text("installment_term"),
                        installment_fee: $.getI18Text("installment_fee"),
                        installment_feeRate: $.getI18Text("installment_feeRate"),
                        installment_first: $.getI18Text("installment_first"),
                        installment_lastAverage: $.getI18Text("installment_lastAverage"),
                        installment_average: $.getI18Text("installment_average"),
                        currency: -1 == $.trim($(".order_mon").html()).indexOf("\u4eba\u6c11\u5e01") ?
                            "CNY" : "\u5143"
                    };
                0 < c.installParam.length && ("allInfirst" == c.installParam[0].feeType ? (l = b["INSTALLMENT-STYLE-ALLINFIRST"], e = a(b["INSTALLMENT-ITEM-LI-ALLINFIRST-ITEAM"], $.extend(c.installParam[0], h))) : (l = b["INSTALLMENT-STYLE-AVERAGE"], e = a(b["INSTALLMENT-ITEM-LI-AVERAGE-ITEAM"], $.extend(c.installParam[0], h))), m = c.installParam[0].payLimitAmountDisplay, j = a(b["INSTALLMENT-RULE-CONTENT-TD"], $.extend(c.installParam[0], h)), g = a(b["INSTALLMENT-TOTAL-AMOUNT"], {
                    orderAmount: parseFloat(c.installParam[0].orderAmount).toFixed(UPOP.currencyIndex),
                    feeDisplay: c.installParam[0].feeDisplay,
                    currency: h.currency,
                    totalAmountDisplay: parseFloat(c.installParam[0].orderAmount + c.installParam[0].fee).toFixed(UPOP.currencyIndex),
                    installmentTotalAmount: $.getI18Text("installmentTotalAmount"),
                    installmentRealAmount: $.getI18Text("installmentRealAmount"),
                    installmentFeeDisplay: $.getI18Text("installmentFeeDisplay")
                }));
                for (var i = 0; c.installParam && i < c.installParam.length; i++) f = "allInfirst" == c.installParam[i].feeType ? f + a(b["INSTALLMENT-ITEM-LI-ALLINFIRST"], $.extend(c.installParam[i],
                    h)) : f + a(b["INSTALLMENT-ITEM-LI-AVERAGE"], $.extend(c.installParam[i], h)), 0 != i && (k += a("<tr>" + b["INSTALLMENT-RULE-CONTENT-TD"] + "</tr>", $.extend(c.installParam[i], h)));
                d = !0;
                $("#container-creditCard-installment-pay").html(a(b["INSTALLMENT-SHOW"], {
                    "installment-select-url": a(b["INSTALLMENT-SELECT"], {
                        "INSTALLMENT-ITEM-LIST": f
                    }),
                    "installment-rule-content": a(b["INSTALLMENT-RULE"], {
                        PATH_STATIC_I18: UPOP.PATH_STATIC_I18,
                        "INSTALLMENT-RULE-CONTENT": a(b["INSTALLMENT-RULE-CONTENT"], {
                            BANK_IMAGE: '<img class="dn" src="' +
                                UPOP.preURL + "/v3_i18/up/zh_CN/images/bank/123_33/" + c.bankNo + '.gif" onLoad="this.className=\'\';" onerror="this.src=\'' + UPOP.preURL + '/v3_i18/up/zh_CN/images/bankbind/default.gif\';this.className=\'\';" width="122" height="33">',
                            "INSTALLMENT-RULE-CONTENT-TD-FIRST": j,
                            "INSTALLMENT-RULE-CONTENT-TD-OTHERS": k,
                            "ROW-NUMBER": o,
                            "INSTALLMENT-STYLE": l,
                            payLimitAmountDisplay: m,
                            installment_tangible: $.getI18Text("installment_tangible"),
                            installment_tangible_up: $.getI18Text("installment_tangible_up"),
                            currency: -1 == $.trim($(".order_mon").html()).indexOf("\u4eba\u6c11\u5e01") ?
                                "CNY" : "\u5143"
                        }),
                        installment_fee_desc: $.getI18Text("installment_fee_desc"),
                        installment_bank: $.getI18Text("installment_bank"),
                        installment_term_count: $.getI18Text("installment_term_count"),
                        installment_feeRate: $.getI18Text("installment_feeRate"),
                        installment_fee_charge: $.getI18Text("installment_fee_charge"),
                        installment_use_range: $.getI18Text("installment_use_range"),
                        installment_process: $.getI18Text("installment_process"),
                        installment_process_unionpay: $.getI18Text("installment_process_unionpay"),
                        installment_return_rule: $.getI18Text("installment_return_rule"),
                        installment_return_rule_tips: $.getI18Text("installment_return_rule_tips"),
                        installment_cancel: $.getI18Text("installment_cancel"),
                        installment_cancel_tips: $.getI18Text("installment_cancel_tips")
                    }),
                    "FIRST-INSTALLMENT-ITEM": e,
                    "INSTALLMENT-TOTAL-AMOUNT": g,
                    installment_title: $.getI18Text("installment_title"),
                    installment_rule_title: $.getI18Text("installment_rule_title"),
                    installment_title_tips: function() {
                        if ($("#bankNo").val().indexOf("0102") == 0 && UPOP.localeStr == "zh_CN") {
                            setTimeout(function() {
                                $(".installment-title em").css("top",
                                    "1px");
                                $(".installment-title em").css("width", "auto")
                            }, 200);
                            return $.getI18Text("installment_title_tips_ICBC")
                        }
                        setTimeout(function() {
                            $(".installment-title em").css("top", "10px");
                            $(".installment-title em").css("width", "auto")
                        }, 200);
                        return $.getI18Text("installment_title_tips")
                    }()
                }))
            } else if (d = !0, $("#container-creditCard-installment-pay").html(a(b["INSTALLMENT-INIT-SHOW"], {
                    installment_msg: function() {
                        if (c.amountChange) return c.tipsMsg ? c.tipsMsg : $.getI18Text("installmentAmountChange");
                        if (c.installParam &&
                            0 == c.installParam.length) return $.getI18Text("installmentOutOfAmount")
                    }(),
                    installment_title: $.getI18Text("installment_title"),
                    installment_rule_title: $.getI18Text("installment_rule_title"),
                    installment_title_tips: function() {
                        if (0 == $("#bankNo").val().indexOf("0102") && "zh_CN" == UPOP.localeStr) return setTimeout(function() {
                            $(".installment-title em").css("top", "1px");
                            $(".installment-title em").css("width", "auto")
                        }, 200), $.getI18Text("installment_title_tips_ICBC");
                        setTimeout(function() {
                            $(".installment-title em").css("top",
                                "10px");
                            $(".installment-title em").css("width", "auto")
                        }, 200);
                        return $.getI18Text("installment_title_tips")
                    }()
                })), c.installParam && 0 == c.installParam.length && ($("#install-box-tips").show(), setTimeout(function() {
                    $("#installment-pay-fenqi").attr("checked", !1)
                }, 300), $("#instalmentPeriods").val("")), c.amountChange) $("#install-box-tips").show(), setTimeout(function() {
                $("#installment-pay-fenqi").attr("checked", false)
            }, 300), $("#instalmentPeriods").val("");
            $("#installment-item li").click(function(e) {
                $("#installment-pay-fenqi").is(":checked") &&
                    ($(this).hasClass("installment-item-li") ? ($("#installment-item li.installment-item-li-selected").removeClass().addClass("installment-item-li"), $(this).removeClass().addClass("installment-item-li-selected"), "allInfirst" == $(this).attr("feeType") ? $("#installment-select-text").html(a(b["INSTALLMENT-ITEM-LI-ALLINFIRST-ITEAM"], {
                            installment_first: $(this).attr("installment_first"),
                            firstDisplay: $(this).attr("firstDisplay"),
                            currency: $(this).attr("currency"),
                            installment_lastAverage: $(this).attr("installment_lastAverage"),
                            averageDisplay: $(this).attr("averageDisplay")
                        })) : $("#installment-select-text").html(a(b["INSTALLMENT-ITEM-LI-AVERAGE-ITEAM"], {
                            currency: $(this).attr("currency"),
                            installment_average: $(this).attr("installment_average"),
                            averageDisplay: $(this).attr("averageDisplay")
                        })), $("#installment-total-amount font").eq(0).html(parseFloat(parseFloat($(this).attr("orderAmount")) + parseFloat($(this).attr("feeDisplay"))).toFixed(UPOP.currencyIndex)), $("#installment-total-amount font").eq(1).html(parseFloat($(this).attr("orderAmount")).toFixed(UPOP.currencyIndex)),
                        $("#installment-total-amount font").eq(2).html($(this).attr("feeDisplay")), $("#useInstalment").val("true"), $("#instalmentPeriods").val($(this).attr("periods"))) : $(this).hasClass("installment-item-li-selected") && (e.preventDefault(), $("#useInstalment").val("true"), $("#instalmentPeriods").val($(this).attr("periods"))))
            });
            $("#installment-pay-fenqi").bind("click", function() {
                $(this).is(":checked") ? $("#useInstalment").val("true") : ($("#useInstalment").val("false"), $("#installment-item li.installment-item-li-selected").removeClass().addClass("installment-item-li"),
                    $("#instalmentPeriods").val(""));
                $(".order_money").html();
                var a = 0,
                    a = window.UPointRelative && window.UPointRelative.hasUsed() ? Math.round($(".order_money").html() * UPOP.currencyIndexMIN) - window.PayDiscount.sum() : Math.round($(".order_money").html() * UPOP.currencyIndexMIN);
                $(this).is(":checked") && UPService.send(UPOP.contextPath + "/fetchInstalmentInfo.action?r=" + Math.random(), "text", {
                    bindId: $("#bindId").val(),
                    transNumber: UPOP.transNumber,
                    sourceType: $("#sourceType").val(),
                    orderAmount: a
                }, {
                    onSuccess: function(a) {
                        UPInstallmentRender.refresh({
                            bankNo: $("#bankNo").val(),
                            installParam: $.parseJSON(a)
                        })
                    },
                    onFail: function() {}
                }, !0)
            });
            var n = function() {
                $("#installment-rule-div").css({
                    left: "20px",
                    top: "-8px"
                }).show()
            };
            $("#installment-rule-pop").mouseover(function() {
                n()
            }).mouseout(function() {
                $("#installment-rule-div").hide()
            });
            $("#installment-rule-pop-href").click(function() {
                n()
            }).mouseout(function() {
                $("#installment-rule-div").hide()
            });
            $(".promptBanksInfo").css("top", $("#container-creditCard-installment-pay").height() + 72 + "px");
            "true" == $("#useInstalment").val() ? $("#installment-pay-fenqi").attr("checked", !0) : $("#installment-pay-fenqi").attr("checked", !1);
            "" != $("#instalmentPeriods").val() ? $("#installment-item li").each(function() {
                $(this).attr("periods") == $("#instalmentPeriods").val() ? ($(this).removeClass().addClass("installment-item-li-selected"), $("#instalmentPeriods").val($(this).attr("periods")), "allInfirst" == $(this).attr("feeType") ? $("#installment-select-text").html(a(b["INSTALLMENT-ITEM-LI-ALLINFIRST-ITEAM"], {
                        installment_first: $(this).attr("installment_first"),
                        firstDisplay: $(this).attr("firstDisplay"),
                        currency: $(this).attr("currency"),
                        installment_lastAverage: $(this).attr("installment_lastAverage"),
                        averageDisplay: $(this).attr("averageDisplay")
                    })) : $("#installment-select-text").html(a(b["INSTALLMENT-ITEM-LI-AVERAGE-ITEAM"], {
                        currency: $(this).attr("currency"),
                        installment_average: $(this).attr("installment_average"),
                        averageDisplay: $(this).attr("averageDisplay")
                    })), $("#installment-total-amount font").eq(0).html(parseFloat(parseFloat($(this).attr("orderAmount")) + parseFloat($(this).attr("feeDisplay"))).toFixed(UPOP.currencyIndex)),
                    $("#installment-total-amount font").eq(1).html(parseFloat($(this).attr("orderAmount")).toFixed(UPOP.currencyIndex)), $("#installment-total-amount font").eq(2).html($(this).attr("feeDisplay"))) : $(this).removeClass().addClass("installment-item-li")
            }) : ($("#installment-item li").first().removeClass().addClass("installment-item-li-selected"), $("#instalmentPeriods").val($("#installment-item li").first().attr("periods")))
        },
        show: function(a) {
            d || this.init(a);
            $("#container-creditCard-installment-pay").show()
        },
        refresh: function(a) {
            this.remove();
            this.show(a)
        },
        hide: function() {
            $("#container-creditCard-installment-pay").hide()
        },
        remove: function() {
            $("#container-creditCard-installment-pay").html("").hide();
            d = !1
        }
    }
})();
$(document).ready(function() {
    function a(e, c) {
        0 < e ? (!1 == d ? (c.addClass("cardselect"), d = !0) : (c.removeClass("cardselect"), d = !1), --e, b = setTimeout(function() {
            a(e, c)
        }, 800)) : (c.removeClass("cardselect"), window.clearInterval(b))
    }
    UPOP.VALIDATOR.TIP_CSS = {
        onShowClass: "txt CardDefault",
        onFocusClass: "txt CardDefault txtclick",
        onErrorClass: "txt CardDefault txterror",
        onCorrectClass: "txt CardDefault"
    };
    UPOP.VALIDATOR.TIP_HTML = {
        onShowHtml: "<div class='text_c CardSmsText text_c_height'>$data$</div>",
        onFocusHtml: "<div class='text_c CardSmsText text_c_height'>$data$</div>",
        onErrorHtml: "<div class='text_c CardSmsText txt_error text_c_height'>$data$</div>",
        onCorrectHtml: "<div class='text_c CardSmsText text_c_height'>$data$</div>"
    };
    addCaptchaCodeValiFun = function() {
        if (0 < $("#showCaptcha").length && "true" == $("#showCaptcha").val() || 0 == $("#showCaptcha").length) $("#captchaCodeListRow").show(), $("#captchaCode").upcaptchaValidate().blur(function() {
                !$("#captchaCode").val() || $.formValidator.areaIsValid("1", [$("#captchaCode").get(0)]) ? $("#captchaCodeTip").hide() : $("#captchaCodeTip").show()
            }).focus(function() {
                $("#captchaCodeTip").hide()
            }),
            $("#captchaCodeTip").hide()
    };
    showCardValiFun = function() {
        "true" == $("#verifyPolicys_name").val() && ($(".CardName").show(), $("#realName").formValidator({
            onShowText: "",
            onShow: $.getI18Text("realName_onShow"),
            onFocus: $.getI18Text("realName_onShow"),
            onCorrect: $.getI18Text("realName_onShow"),
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, b) {
                if ("" == a) return b.settings[1].onError = $.getI18Text("realName_must"), !1;
                String.prototype.xLenGBK = function() {
                    return this.replace(/[^\x00-\xff]/g, "**").length
                };
                if (30 <
                    a.xLenGBK()) return b.settings[1].onError = $.getI18Text("userName_vali_short"), !1
            },
            onError: $.getI18Text("realName_onShow")
        }));
        "true" == $("#verifyPolicys_credential").val() && ($(".credential").show(), $("#identify-choice-id").hover(function() {
            $(".idsort_item").addClass("blue_line")
        }, function() {
            $(".idsort_item").removeClass("blue_line")
        }).click(function() {
            $(".idsort_list").fadeIn("fast")
        }), $(".idsort_Wrap").hover(function() {}, function() {
            $(".idsort_list").hide()
        }), $(".idsort_list li").hover(function() {
                $(this).addClass("hover")
            },
            function() {
                $(this).removeClass("hover")
            }).click(function() {
            var a = $(this).attr("certValue");
            a != $(".idsort_item").attr("certValue") && $("#credentialNo").val("");
            $(".idsort_item").attr("certValue", a);
            $(".idsort_item span").html($(this).html());
            $(".idsort_list").hide();
            $("#credentialType").val(a);
            _tips = ($.getI18Text("cardMustInput_name") + $(this).html() + $.getI18Text("cardMustInput_number")).replace(" ", "");
            $.formValidator.setTipState($("#credentialNo").get(0), "onShow", _tips);
            $("#credentialNo").get(0).settings[0].onShow =
                _tips;
            $("#credentialNo").get(0).settings[0].onFocus = _tips;
            $("#credentialNo").get(0).settings[0].onCorrect = _tips;
            $("#credentialNo").get(0).settings[0].onError = $.trim($(this).html()) + $.getI18Text("cardMustInput_error")
        }), $(".credential").click(function() {
            $("#certifyDisplayImage").show();
            $("." + getCurrentCertifyID()).show();
            $(".cardDate").hide();
            $(".cardCvn2").hide()
        }), $("#credentialNo").formValidator({
            onShowText: "",
            onShow: $.getI18Text("id_onShow"),
            onFocus: $.getI18Text("id_onShow"),
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a,
                b) {
                if (a == "") {
                    b.settings[1].onError = $.trim($(".idsort_item span").html()) + $.getI18Text("cardMustInput_name_must");
                    return false
                }
                var c = a.replace(/[ ]/g, "");
                if ($(".idsort_item span").html().replace(/[ ]/g, "") == $.getI18Text("id_name")) {
                    if (!UPOPUtils.checkIDCard(c)) {
                        b.settings[1].onError = $.trim($(".idsort_item span").html()) + $.getI18Text("cardMustInput_error");
                        return false
                    }
                } else if (!/^[^!$%\^&*?<>]{5,18}$/.test(c)) {
                    b.settings[1].onError = $.trim($(".idsort_item span").html()) + $.getI18Text("cardMustInput_error");
                    return false
                }
            },
            onError: $.getI18Text("id_input_onShow")
        }), $(".idsort_list li").each(function() {
            if ($(this).attr("certValue") == $("#credentialType").val()) {
                $(".idsort_item").attr("certValue", $(this).attr("certValue"));
                $(".idsort_item span").html($(this).html());
                $(".idsort_list").hide();
                $("#credentialType").val($(this).attr("certValue"));
                var a = ($.getI18Text("cardMustInput_name") + $.trim($(this).html()) + $.getI18Text("cardMustInput_number")).replace(" ", "");
                $.formValidator.setTipState($("#credentialNo").get(0),
                    "onShow", a);
                $.formValidator.setTipState($("#credentialNo").get(0), "onCorrect", a);
                $("#credentialNo").get(0).settings[0].onShow = a;
                $("#credentialNo").get(0).settings[0].onFocus = a;
                $("#credentialNo").get(0).settings[0].onCorrect = a;
                $("#credentialNo").get(0).settings[0].onError = $.trim($(this).html()) + $.getI18Text("cardMustInput_error")
            }
        }));
        "true" == $("#verifyPolicys_expire").val() && ($(".CardExpire").show(), $(".promptBanksInfo").show(), $("#expireMonth").upselectlist({
            data: "01,02,03,04,05,06,07,08,09,10,11,12"
        }).formValidator({
            onShowText: "",
            onShow: $.getI18Text("cvn2_onfocus"),
            onFocus: $.getI18Text("cvn2_onfocus"),
            onError: $.getI18Text("cvn2_onerror"),
            onCorrect: $.getI18Text("cvn2_onfocus"),
            validatorGroup: "1",
            tipID: "expireMonthTip",
            valiCallback: function(a) {
                a = $(a).val();
                if (!UPOP.VALIDATOR.REGEX.expireDate.test(a) && a != "") return false;
                a = $("#expireYear").val();
                UPOPUtils.getExpireYearSplitStr();
                if (!UPOP.VALIDATOR.REGEX.expireDate.test(a) && a != "") {
                    $("#expireMonth").removeClass().addClass(UPOP.VALIDATOR.TIP_CSS.onShowClass);
                    $("#expireYear").removeClass().addClass(UPOP.VALIDATOR.TIP_CSS.onErrorClass);
                    $("#expireMonthTip").find("div").removeClass().addClass("text_c CardText text_c_show text_red").html($.getI18Text("cvn2_onerror_tips"));
                    return false
                }
                return true
            }
        }).regexValidator({
            regExp: UPOP.VALIDATOR.REGEX.expireDate,
            onError: $.getI18Text("cvn2_onerror_tips")
        }).functionValidator({
            fun: function(a) {
                return ",01,02,03,04,05,06,07,08,09,10,11,12,".indexOf("," + a + ",") < 0 ? false : true
            },
            onError: $.getI18Text("cvn2_onerror_tips")
        }).upnumeral().focus(function() {
            $(".cardDate").css("display", "inline-block");
            $(".cardCvn2").css("display",
                "inline-block");
            $(".cardDate").height() + $(".cardCvn2").height() + 5 > $("#content-div-id").height() && $("#PageEname").val() == "cardPay" && $(".payrow").height($(".payrow").height() + 40);
            getCurrentCertifyID() != "" && $("." + getCurrentCertifyID()).hide()
        }).blur(function() {}), $("#expireYear").upselectlist({
            data: UPOPUtils.getExpireYearStr()
        }).formValidator({
            onShowText: "",
            onShow: $.getI18Text("cvn2_onfocus"),
            onFocus: $.getI18Text("cvn2_onfocus"),
            onError: $.getI18Text("cvn2_onerror"),
            onCorrect: $.getI18Text("cvn2_onfocus"),
            validatorGroup: "1",
            tipID: "expireMonthTip",
            valiCallback: function() {
                var a = $("#expireYear").val();
                if (!UPOP.VALIDATOR.REGEX.expireDate.test(a) && a != "") return false;
                a = $("#expireMonth").val();
                if (",01,02,03,04,05,06,07,08,09,10,11,12,".indexOf("," + a + ",") < 0 && a != "") {
                    $("#expireYear").removeClass().addClass(UPOP.VALIDATOR.TIP_CSS.onShowClass);
                    $("#expireMonth").removeClass().addClass(UPOP.VALIDATOR.TIP_CSS.onErrorClass);
                    $("#expireMonthTip").find("div").removeClass().addClass("text_c CardText text_c_show text_red").html($.getI18Text("cvn2_onerror_tips"));
                    return false
                }
                return true
            }
        }).regexValidator({
            regExp: UPOP.VALIDATOR.REGEX.expireDate,
            onError: $.getI18Text("cvn2_onerror_tips")
        }).functionValidator({
            fun: function() {
                return true
            },
            onError: $.getI18Text("cvn2_onerror_tips")
        }).upnumeral().focus(function() {
            $(".cardDate").css("display", "inline-block");
            $(".cardCvn2").css("display", "inline-block");
            $(".cardDate").height() + $(".cardCvn2").height() + 5 > $("#content-div-id").height() && $("#PageEname").val() == "cardPay" && $(".payrow").height($(".payrow").height() + 40);
            getCurrentCertifyID() !=
                "" && $("." + getCurrentCertifyID()).hide()
        }));
        "true" == $("#verifyPolicys_cvn2").val() && $(".CardCVN2").show();
        "true" == $("#verifyPolicys_password").val() && $(".CardPassword").show()
    };
    removeShowCardValiFun = function() {
        $(".credential").hide();
        $(".CardName").hide();
        $(".CardExpire").hide();
        $(".CardPassword").hide();
        $(".CardCVN2").hide();
        $("#expireMonth").removeFormValidator({
            validatorGroup: "1"
        });
        $("#expireYear").removeFormValidator({
            validatorGroup: "1"
        });
        $("#realName").removeFormValidator({
            validatorGroup: "1"
        });
        $("#credentialNo").removeFormValidator({
            validatorGroup: "1"
        })
    };
    removeCaptchaCodeValiFun = function() {
        $("#captchaCodeListRow").hide();
        $("#captchaCode").removeFormValidator({
            validatorGroup: "1"
        })
    };
    removeSmsCodeValiFun = function() {
        $("#smsCode").removeFormValidator({
            validatorGroup: "1"
        })
    };
    addSmsCodeValiFun = function() {
        $("#smsCode").upnumeral().formValidator({
            onShowText: "",
            onShow: $.getI18Text("smsCode_input_tips"),
            onShowCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ? !0 : !1
            },
            onFocus: $.getI18Text("smsCode_input_tips"),
            onFocusCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ? !0 : !1
            },
            onCorrect: $.getI18Text("smsCode_input_tips"),
            onErrorCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ? !0 : !1
            },
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, b) {
                if ("" == a) return b.settings[1].onError = $.getI18Text("smsCode_must_tips"), !1;
                var c = a.replace(/[ ]/g, "");
                if (6 > c.length) return b.settings[1].onError = "" != c.replace(/[\d]/g, "") ? $.getI18Text("smsCode_error_tips") : $.getI18Text("smsCode_error_limit"), !1;
                if (UPOP.VALIDATOR.REGEX.smsCode.test(a.replace(/[ ]/g, ""))) return !0;
                b.settings[1].onError = $.getI18Text("smsCode_error_tips");
                return !1
            },
            onError: $.getI18Text("smsCode_error_tips")
        })
    };
    addBankSmsCodeValiFun = function() {
        $("#smsCode").upnumeral().formValidator({
            onShowText: "",
            onShow: $.getI18Text("smsBankCode_input_tips"),
            onShowCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ? !0 : !1
            },
            onFocus: $.getI18Text("smsBankCode_input_tips"),
            onFocusCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ?
                    !0 : !1
            },
            onCorrect: $.getI18Text("smsBankCode_input_tips"),
            onErrorCallBack: function() {
                return 0 == $("#smsCodeTip").find("span").length ? !0 : !1
            },
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, b) {
                if ("" == a) return b.settings[1].onError = $.getI18Text("smsCode_must_tips"), !1;
                var c = a.replace(/[ ]/g, "");
                if (6 > c.length) return b.settings[1].onError = "" != c.replace(/[\d]/g, "") ? $.getI18Text("smsCode_error_tips") : $.getI18Text("smsCode_error_limit"), !1;
                if (UPOP.VALIDATOR.REGEX.smsCode.test(a.replace(/[ ]/g, ""))) return !0;
                b.settings[1].onError = $.getI18Text("smsCode_error_tips");
                return !1
            },
            onError: $.getI18Text("smsCode_error_tips")
        })
    };
    $.fn.upCheckAgreementValidate = function() {
        return this.each(function() {
            $(this).formValidator({
                onShowText: "",
                onShow: "&nbsp;",
                onFocus: "&nbsp;",
                onError: $.getI18Text("agreement_onerror_paytips"),
                onCorrect: "&nbsp;",
                validatorGroup: "1",
                tipID: "isCheckAgreementTip"
            }).inputValidator({
                min: 1,
                max: 1,
                onError: $.getI18Text("agreement_onerror_paytips")
            }).click(function() {
                "checked" != $(this).attr("checked") ?
                    ($("#isCheckAgreement").val("unon"), $("#isCheckAgreementTip").show(), $("#isCheckAgreementTip").find("div").removeClass().addClass("text_c CardSmsText txt_error").html($.getI18Text("agreement_onerror_paytips"))) : ($("#isCheckAgreement").val("on"), $("#isCheckAgreementTip").show(), $("#isCheckAgreementTip").find("div").removeClass().addClass("text_c CardSmsText").html("&nbsp;"))
            })
        })
    };
    removeCCBAgreementValiFun = function() {
        $("#CCBAggrement").hide();
        $("#isCheckCCBAgreement").removeFormValidator({
            validatorGroup: "1"
        })
    };
    addCCBAgreementValiFun = function() {
        "true" == $("#showCCBAggrement").val() && ($("#CCBAggrement").show(), $("#isCheckCCBAgreement").upCheckCCBAgreementValidate())
    };
    $.fn.upCheckCCBAgreementValidate = function() {
        return this.each(function() {
            $(this).formValidator({
                onShowText: "",
                onShow: "&nbsp;",
                onFocus: "&nbsp;",
                onError: $.getI18Text("ccbagreement_onerror_paytips"),
                onCorrect: "&nbsp;",
                validatorGroup: "1",
                tipID: "isCheckCCBAgreementTip"
            }).inputValidator({
                min: 1,
                max: 1,
                onError: $.getI18Text("ccbagreement_onerror_paytips")
            }).click(function() {
                "checked" !=
                $(this).attr("checked") ? ($("#isCheckCCBAgreement").val("unon"), $("#isCheckCCBAgreementTip").show(), $("#isCheckCCBAgreementTip").find("div").removeClass().addClass("text_c CardSmsText txt_error").html($.getI18Text("ccbagreement_onerror_paytips"))) : ($("#isCheckCCBAgreement").val("on"), $("#isCheckCCBAgreementTip").show(), $("#isCheckCCBAgreementTip").find("div").removeClass().addClass("text_c CardSmsText").html("&nbsp;"))
            })
        })
    };
    0 < $("#credentialType").length && ("" == $("#credentialType").val() && $("#credentialType").val("01"),
        $(".cardDate").hide(), $(".cardCvn2").hide(), $("#certifyDisplayImage").show());
    $(".card_down").hover(function() {
        $(this).addClass("card_hover");
        $(".card_num").addClass("card_num_hover")
    }, function() {
        $(this).removeClass("card_hover");
        $(".card_num").removeClass("card_num_hover")
    }).click(function() {
        $(".more_list").fadeIn("fast")
    });
    $(".cardinfo").hover(function() {}, function() {
        $(".more_list").fadeOut("fast")
    });
    $(".more_list").find("iframe").width($(".more_list").width());
    $(".more_list").find("iframe").height($(".more_list").height() -
        2);
    0 < $(".idsort_list").length && ($(".idsort_list").find("iframe").width($(".idsort_list").width()), $(".idsort_list").find("iframe").height($(".idsort_list").height() - 2));
    $(".Card_Date").click(function() {
        $(".cardCvn2").removeClass("cardselect");
        window.clearInterval(b);
        a(5, $(".cardDate"))
    });
    var d = !1,
        b;
    $(".getMoible a").click(function() {
        if ($.browser.msie && parseInt($.browser.version) === 6 && typeof window.XMLHttpRequest !== "object") {
            $(".expire div").show().css("visibility", "hidden");
            setTimeout(function() {
                $(".expire input").trigger("click");
                $(".expire div").css("visibility", "visible")
            }, 1)
        }
    });
    UPOP.gotoBankPay = function() {
        $.modal.close();
        $("#csPay").submit();
        if ($("#_ocx_password").length > 0 && $("#mockLoginPassword").length > 0) {
            $("#_ocx_password").hide();
            $("#mockLoginPassword").removeClass("dn")
        }
        if ($("#_ocx_cvn2").length > 0 && $("#mockCVN2").length > 0) {
            $("#_ocx_cvn2").hide();
            $("#mockCVN2").removeClass("dn")
        }
        setTimeout(function() {
            $("#ebank_pop_id").modal({
                containerId: "simplemodal-container2",
                onClose: function() {
                    $.modal.close();
                    if ($("#_ocx_password").length >
                        0 && $("#mockLoginPassword").length > 0) {
                        $("#_ocx_password").show();
                        $("#mockLoginPassword").addClass("dn")
                    }
                    if ($("#_ocx_cvn2").length > 0 && $("#mockCVN2").length > 0) {
                        $("#_ocx_cvn2").show();
                        $("#mockCVN2").addClass("dn")
                    }
                }
            });
            var a = (UPOPUtils.getWinWidth() - 450) / 2,
                b = (UPOPUtils.getWinHeight() - 170) / 2;
            $("#simplemodal-container2").css({
                width: "450px",
                height: "170px",
                left: a + "px",
                top: b + "px",
                padding: "0",
                overflow: "hidden"
            })
        }, 2E3)
    };
    var c = !1,
        f = !1;
    $(".view_ebanknum").click(function() {
        f = true;
        $(".ebank").css("z-index", "3333");
        $(".ebank_tips table").hide();
        $(".ebank_tips table[bankcode=" + netBankTipsCode + "]").show();
        $(".ebank_tips").show();
        $(this).html($.getI18Text("upop_button_showlimit"));
        $(".ebank_tips table").mouseover(function() {
            c = true
        }).mouseleave(function() {
            c = false;
            setTimeout(function() {
                if (f == false) {
                    $(".ebank_tips").hide();
                    $(".ebank").css("z-index", "1");
                    $(".view_ebanknum").html($.getI18Text("upop_button_showlimit"))
                }
            }, 1E3)
        })
    }).mouseout(function() {
        f = false;
        setTimeout(function() {
            if (c == false) {
                $(".ebank_tips").hide();
                $(".ebank").css("z-index", "1");
                $(".view_ebanknum").html($.getI18Text("upop_button_showlimit"))
            }
        }, 1E3)
    });
    0 == $(".order_u").length && $(".go_ebank").click(function() {
        UPOP.gotoBankPay()
    });
    $("#reg_pop_cancelbtn").click(function() {
        $.modal.close()
    });
    $("#reg_pop_button").click(function() {
        $("#showCardForm").length > 0 && $("#showCardForm").submit()
    });
    $("#btnOpen").click(function() {
        ($("#PageEname").val() == "cardPay" || $("#PageEname").val() == "cardPay4BankOpen") && $(".payrow").attr("originalHeight") && $(".payrow").height($(".payrow").attr("originalHeight"));
        UPOP.refreshTopPointICON && $("#fromUserLogin").val() == "true" && UPOP.refreshTopPointICON();
        bankTipsOpen()
    });
    $("#btnUnopen").click(function() {
        $(this).removeClass("btn_open").addClass("btn_unopen");
        $(".content_main").css("min-height", "300px");
        $(".infobank").show();
        if ($("#otherBank4upopPay").length > 0) {
            $(".content_main").css("min-height", "394px");
            $("#otherBank4upopPay").css("top", "240px")
        }
    });
    $("#continuepay").click(function() {
        $.modal.close();
        $(".bankinfo").hide();
        $(".cardmsg").show();
        if ($("#cardType").val() ==
            "CreditCard") $(".creditCard").show();
        else {
            $(".debitCard").show();
            $("#_ocx_password_upe").show()
        }
        $("#cardPay_all_need").show();
        showCardValiFun();
        $(".CardMobile").show();
        addCaptchaCodeValiFun()
    });
    $("#netbank_pop_gobankpay").click(function() {
        UPOP.gotoBankPay()
    });
    $("#netbank_pop_gobankpay_after").click(function() {
        UPOP.gotoBankPay()
    });
    $(".switchCard").click(function() {
        $("#switchCardForm").submit()
    });
    window.MobileDisplayMode.init();
    "" == $.cookie("up_b2") && (0 < $("#rememberCardNumber").length && !$("#rememberCardNumber").is(":hidden")) &&
        $("#rememberCardNumber").removeAttr("checked")
});
(function(a) {
    if (!a) return null;
    a.orderInfoUpoint && !0 == a.orderInfoUpoint.show && window.DiscountRelative && window.DiscountRelative.main(a);
    a.orderInfoUpoint && (!0 == a.orderInfoUpoint.upointBizOpen && !0 == a.logined || !0 == a.orderInfoUpoint.discountBizOpen) && window.DiscountRelative && window.DiscountRelative.main(a)._upointBizOpen();
    $(document).ready(function() {
        window.CardInfoRequest.init(UPOP.PATH_STATIC_I18);
        UPOP.actionPreURL = UPOP.contextPath;
        UPOP.preURL = UPOP.url_prex_static_https;
        (new UPAgreementRender).render({
            type: $("#aggrementType").val(),
            descName: $("#aggrementDesc").val(),
            bankNo: $("#bankNo").val(),
            cardType: $("#cardType").val(),
            preURL: UPOP.url_prex_static_https
        });
        "03100000" == a.displayCardInfo.bankNo && "DebitCard" == a.displayCardInfo.displayCardType && $.setI18Text("mobilephone_onFocus_tips", $.getI18Text("mobilephone_pufa_onFocus_tips"));
        a.hasActionErrors && $(".list").css("padding-top", "20px");
        0 < $("#credentialType").length && ("" == $("#credentialType").val() && $("#credentialType").val("01"), $(".cardDate").hide(), $(".cardCvn2").hide(), $("#certifyDisplayImage").show());
        netBankTipsCode = a.displayCardInfo.netBankResult.bankCode;
        addAgreementValiFun = function() {
            if ($("#aggrementType").val() != "NO_AGREEMENT") {
                $("#btnCardPay").val($.getI18Text("upop_payandopen_card"));
                $(".Card_agr").show();
                $("#isCheckAgreement").upCheckAgreementValidate()
            }
        };
        $(".more_list li:last").css("border", "none");
        $(".more_list li").click(function() {
            var a = $(this).html();
            $(".card_left").html(a);
            $(".bindId").val($(this).attr("bindId"));
            $("#cardType").val($(this).attr("cardType"));
            $("#cardNumberDisplay").val($(this).attr("cardNumberDisplay"));
            a = $(this).attr("bankNo");
            $("#bankNo").val(a);
            $("#cardType").val() == "DebitCard" && $(this).attr("bankno") == "03340000" ? $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BOP")) : $("#cardType").val() == "DebitCard" && ($(this).attr("bankno") == "04031000" || $(this).attr("bankno") == "04721460") ? $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BJB")) : $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_NORMAL"));
            $(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips"));
            if (window.TopExchange) {
                window.TopExchange.updateExchangeResult();
                window.TopExchange.refreshExchangeResult()
            }
            $("#conversionType").val("");
            $(".notice_boxerror").hide();
            $("#useInstalment").val("false");
            $("#instalmentPeriods").val("");
            window.verifyDisplay.reset();
            $("#top-point-bankinfo li").each(function() {
                $(this).find("a").attr("select") == "true" && $(this).find("a").trigger("click")
            });
            setTimeout(function() {
                $("#top-point-bankinfo").html("").hide();
                $("#top-point-sj").hide()
            }, 500);
            fetchCardExtraInfo(UPOP.contextPath,
                UPOP.transNumber, a);
            $("#cellPhoneNumber").val("").attr("originalPhoneNumber", "");
            if ($("#discountBizOpen").length > 0 && $("#discountBizOpen").val() == "true") {
                a = $.extend(window.UPOP.DisCount.options, {
                    selectItem: null,
                    transNumber: UPOP.transNumber
                });
                Math.round($("#discountAmount").val()) > 0 && (a = $.extend(a, {
                    selectItem: {
                        discountAmount: $("#discount-display-info-check-li").attr("discountAmount"),
                        discountId: $("#discount-display-info-check-li").attr("discountId"),
                        randomDiscount: $("#discount-display-info-check-li").attr("randomDiscount"),
                        activityName: $("#discount-display-info-check-li").html()
                    }
                }));
                window.UPOP.DisCount && window.UPOP.DisCount.reset(a)
            }
            $(".more_list").fadeOut("fast");
            $(".promptBanksInfo").hide();
            $("#sourceType").val($("#initSourceType").val());
            $(".CardMobile").hide();
            $(".CardMobileShow").show();
            $(".bankmobile,.cancelmobile").hide();
            $("#sourceType").val() == "Propay" && $(".creditCard,.debitCard").hide();
            $("#cellPhoneNumber").removeFormValidator({
                validatorGroup: "1"
            }).val("");
            if ($("#sourceType").val() == "Propay") {
                removeShowCardValiFun();
                removeCaptchaCodeValiFun();
                removeAgreementValiFun()
            }
        }).hover(function() {
            $(this).addClass("hover")
        }, function() {
            $(this).removeClass()
        });
        $(".getMoible a").click(function() {
            var b = function() {
                $("#sourceType").val("NewCard");
                var b = $("#initSourceType").val();
                $("#conversionType").val(b + "2" + $("#sourceType").val());
                $(".CardMobile").show();
                if (!($("#verifyPolicys_smsCode").val() == "true" && b == "Propay"))
                    if ($("#fromBankOpenCard").val() == "true") removeShowCardValiFun();
                    else {
                        if (b == "Propay") showCardValiFun();
                        else if (b ==
                            "Litepay") {
                            removeShowCardValiFun();
                            var c = a.displayCardInfo.openVerifyFactor,
                                d;
                            for (d in c) $("#verifyPolicys_" + d).val(c[d]);
                            showCardValiFun()
                        }
                        if ((b == "Propay" || b == "Litepay") && $("#foreignMerchant").val() == "true")
                            if ($("#verifyPolicys_cvn2").val() == "true") {
                                $(".CardCVN2").show();
                                $("#cvn2").formValidator({
                                    onShowText: "",
                                    onShow: $.getI18Text("upop_cvn2_tips"),
                                    onFocus: $.getI18Text("upop_cvn2_tips"),
                                    onCorrect: $.getI18Text("upop_cvn2_tips"),
                                    validatorGroup: "1"
                                }).functionValidator({
                                    fun: function(a, b) {
                                        if (a == "") {
                                            b.settings[1].onError =
                                                $.getI18Text("upop_cvn2_tips");
                                            return false
                                        }
                                        if (a.replace(/[ ]/g, "").length < 3) {
                                            b.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                                            return false
                                        }
                                    },
                                    onError: $.getI18Text("upop_cvn2_tips")
                                })
                            } else $("#cvn2").removeFormValidator({
                                validatorGroup: "1"
                            })
                    }
                $(".CardMobileShow").hide();
                addAgreementValiFun();
                removeCCBAgreementValiFun();
                if (b == "Propay") {
                    $(".bankmobile").show();
                    if ($("#verifyPolicys_smsCode").val() == "true") {
                        $(".bankmobile span").html($.getI18Text("mobilePhone_change_tips"));
                        $("#sourceType").val("Propay");
                        $("#conversionType").val(b + "2" + $("#sourceType").val())
                    } else $(".bankmobile span").html($.getI18Text("mobilePhone_update_tips"));
                    if ($(".idsort_list").length > 0) {
                        $(".idsort_list").find("iframe").width($(".idsort_list").width());
                        $(".idsort_list").find("iframe").height($(".idsort_list").height() - 2)
                    }
                } else if (b == "Litepay") {
                    $(".cancelmobile").show();
                    if ($("#verifyPolicys_smsCode").val() == "true") {
                        $("#sourceType").val("Litepay");
                        $("#forceCheckAgr").val() == "false" && removeAgreementValiFun()
                    }
                }
                $("#cardType").val() ==
                    "DebitCard" && $("#bankNo").val() == "03100000" ? $.setI18Text("mobilephone_onFocus_tips", $.getI18Text("mobilephone_pufa_onFocus_tips")) : $.setI18Text("mobilephone_onFocus_tips", $.getI18Text("mobilephone_onFocus_tips_normal"));
                $("#cellPhoneNumber").uptelephone().upcardTelephoneValidate().functionValidator({
                    fun: function(a, b) {
                        window.UPOP.DisCount && window.UPOP.DisCount.phoneRefresh(a, b);
                        return true
                    },
                    onError: ""
                });
                $("#verifyPolicys_smsCode").val() == "true" && b == "Propay" ? removeAgreementValiFun() : addCaptchaCodeValiFun();
                $(".mb_dir").hide();
                window.MobileDisplayMode.show()
            };
            if ($("#foreignCard").length > 0 && $("#foreignCard").val() == "true") $("#foreignCardForm").submit();
            else if ($("#bankSmsType").val() == "1") $("#bankSmsTypeForm").submit();
            else if ($("#bankSmsType").val() == "3") {
                window._checkBankSmsTypeFun = function(a) {
                    UPService.send(UPOP.contextPath + "/reQueryBank.action?r=" + Math.random(), "text", {
                        transNumber: UPOP.transNumber,
                        queryId: a
                    }, {
                        onSuccess: function(d) {
                            try {
                                r = jQuery.parseJSON(d);
                                if (r.success == true) {
                                    r.actionType == "query" &&
                                        _checkBankSmsTypeFun(r.param);
                                    if (r.code == "2")(new Date).getTime() - c < 5E3 ? _checkBankSmsTypeFun(a) : b();
                                    else if (r.code == "NORMAL") {
                                        $("#bankActivatePhoneNumberDisplay").val(r.message);
                                        b()
                                    }
                                } else b()
                            } catch (g) {
                                b()
                            }
                        },
                        onFail: function() {
                            b()
                        }
                    }, false)
                };
                var c = (new Date).getTime();
                window._checkBankSmsTypeFun()
            } else b()
        });
        $(".cancelmobile,.bankmobile a").click(function() {
            var b = $("#initSourceType").val();
            $(".mb_dir").hide();
            $("#sourceType").val($("#initSourceType").val());
            $(".CardMobile").hide();
            $(".bankmobile,.cancelmobile").hide();
            $(".CardMobileShow").show();
            if ($("#forceCheckAgr").val() == "false") {
                $(".Card_agr").hide();
                removeAgreementValiFun()
            }
            if ($("#sourceType").val() == "Propay") {
                $(".creditCard,.debitCard").hide();
                $(".promptBanksInfo").hide();
                removeCaptchaCodeValiFun()
            }
            $("#cellPhoneNumber").removeFormValidator({
                validatorGroup: "1"
            });
            $("#cellPhoneNumber").val("").attr("originalPhoneNumber", "");
            if ($("#discountBizOpen").length > 0 && $("#discountBizOpen").val() == "true") {
                var c = $.extend(window.UPOP.DisCount.options, {
                    selectItem: null
                });
                Math.round($("#discountAmount").val()) > 0 && (c = $.extend(c, {
                    selectItem: {
                        discountAmount: $("#discount-display-info-check-li").attr("discountAmount"),
                        discountId: $("#discount-display-info-check-li").attr("discountId"),
                        randomDiscount: $("#discount-display-info-check-li").attr("randomDiscount"),
                        activityName: $("#discount-display-info-check-li").html()
                    }
                }));
                window.UPOP.DisCount && window.UPOP.DisCount.reset(c)
            }
            if ($("#sourceType").val() == "Propay") {
                removeShowCardValiFun();
                removeCaptchaCodeValiFun();
                $("#captchaCodeListRow").hide()
            } else if (b ==
                "Litepay") {
                removeShowCardValiFun();
                var c = a.displayCardInfo.verifyFactor,
                    d;
                for (d in c) $("#verifyPolicys_" + d).val(c[d]);
                showCardValiFun()
            }
            if ((b == "Propay" || b == "Litepay") && $("#foreignMerchant").val() == "true")
                if ($("#verifyPolicys_cvn2").val() == "true") {
                    $(".CardCVN2").show();
                    $("#cvn2").formValidator({
                        onShowText: "",
                        onShow: $.getI18Text("upop_cvn2_tips"),
                        onFocus: $.getI18Text("upop_cvn2_tips"),
                        onCorrect: $.getI18Text("upop_cvn2_tips"),
                        validatorGroup: "1"
                    }).functionValidator({
                        fun: function(a, b) {
                            if (a == "") {
                                b.settings[1].onError =
                                    $.getI18Text("upop_cvn2_tips");
                                return false
                            }
                            if (a.replace(/[ ]/g, "").length < 3) {
                                b.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                                return false
                            }
                        },
                        onError: $.getI18Text("upop_cvn2_tips")
                    })
                } else $("#cvn2").removeFormValidator({
                    validatorGroup: "1"
                });
            $("#conversionType").val("");
            addCCBAgreementValiFun();
            window.MobileDisplayMode.hide()
        });
        bankTipsOpen = function() {
            $("#otherBank4upopPay").hide();
            $(".bankinfo").hide();
            $(".cardmsg").show();
            showCardValiFun();
            $(".CardMobile").show();
            $("#cardPay_all_need").show();
            $("#sourceType").val() != "PayAndOpenCard" && addAgreementValiFun();
            addCaptchaCodeValiFun();
            if ($("#fromMemorizeCard").val() != "true" && $("#sourceType").val() != "Propay") {
                $(".rememberCardNumber_agr").show();
                $.cookie("up_b2") == "" && $("#rememberCardNumber").removeAttr("checked")
            }
            if ($("#foreignMerchant").val() == "true")
                if ($("#verifyPolicys_cvn2").val() == "true") {
                    $(".CardCVN2").show();
                    $("#cvn2").formValidator({
                        onShowText: "",
                        onShow: $.getI18Text("upop_cvn2_tips"),
                        onFocus: $.getI18Text("upop_cvn2_tips"),
                        onCorrect: $.getI18Text("upop_cvn2_tips"),
                        validatorGroup: "1"
                    }).functionValidator({
                        fun: function(a, c) {
                            if (a == "") {
                                c.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                                return false
                            }
                            if (a.replace(/[ ]/g, "").length < 3) {
                                c.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                                return false
                            }
                        },
                        onError: $.getI18Text("upop_cvn2_tips")
                    })
                } else $("#cvn2").removeFormValidator({
                    validatorGroup: "1"
                })
        };
        if (!0 == a.displayCardInfo.existsTips && ("OPEN_NET_BANK" == a.displayCardInfo.tipsVO.forwardType || "RESERVE_PHONE" == a.displayCardInfo.tipsVO.forwardType)) $("#btnUnopenYc").click(function() {
            $(".unopenYc_pop").modal({
                containerId: "simplemodal-container2"
            });
            var a = (UPOPUtils.getWinWidth() - 700) / 2,
                c = (UPOPUtils.getWinHeight() - 430) / 2;
            $("#simplemodal-container2").css({
                width: "700px",
                height: "430px",
                left: a + "px",
                top: c + "px",
                padding: "0",
                overflow: "hidden"
            })
        }), $(".btn_gowww").click(function() {
            $(".gowrap").hide();
            $(".btn_goafter").show();
            window.open(a.displayCardInfo.tipsVO.url)
        });
        !0 == a.displayCardInfo.existsTips && null == a.phoneNumber && ($(".payrow").attr("originalHeight", $(".payrow").height()), $(".payrow").height($(".bankinfo").height()));
        $("#btnCardPay").mousedown(function() {
            setTimeout(function() {
                if (a.logined) {
                    var b =
                        a.login.union_user_url_prex + "/ucsso/rest/obtain?callback=?";
                    $.uppopUnionLogin({
                        title: a.login.title,
                        popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
                        loginStatusUrl: b,
                        proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
                        registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" + a.login.union_user_upop_infSource,
                        callBackFun: function(a) {
                            if (a == "n") $.getJSON(b, {}, function(a) {
                                if ($("#loginName").val() == a) {
                                    $("#fromUserLogin").val("true");
                                    $("#cardPay").submit()
                                } else window.location.href = UPOP.contextPath + "/showCard.action?transNumber=" + UPOP.transNumber
                            });
                            else {
                                $("#fromUserLogin").val("true");
                                $("#cardPay").submit()
                            }
                        }
                    })
                } else $("#cardPay").submit()
            }, 100)
        });
        $.formValidator.initConfig({
            formID: "cardPay",
            mode: UPOP.VALIDATOR.TIP_MODE.FixTip,
            validatorGroup: "1",
            preSubmit: function() {
                $("#sourceType").val() != "Propay" ? $("#fromBankOpenCard").val() == "true" ? $("#cardPay").attr("action",
                    UPOP.contextPath + "/payAfterOpenCard.action?transNumber=" + UPOP.transNumber) : $("#cardPay").attr("action", UPOP.contextPath + "/cardPay.action?transNumber=" + UPOP.transNumber) : $("#cardPay").attr("action", UPOP.contextPath + "/proPay.action?transNumber=" + UPOP.transNumber);
                if (UPOP.acpAgent != "pad" && (window.upeditoratm.osBrowser == 10 || window.upeditoratm.osBrowser == 11)) {
                    if (!$(".debitCard").is(":hidden")) {
                        window.upeditoratm.keyName = addUPEditorValiFun.genSeedCode();
                        window.upeditoratm.callback = function() {
                            window.upeditoratmResult =
                                new $.upeResult(outs[window.upeditoratm.settings.pgeWindowID].enstr, window.upeditoratm.settings.errMapping);
                            window.upeditorResultMachine = new $.upeResult(outs[window.upeditoratm.settings.pgeWindowID].mac, window.upeditoratm.settings.errMapping)
                        };
                        $.formValidator.getInitConfig("1").pageUPEditor = [window.upeditoratm]
                    }
                    if (!$(".cvnobject").is(":hidden") && $("#foreignMerchant").val() != "true") {
                        window.upeditorcvn.keyName = addUPEditorValiFun.genSeedCode();
                        window.upeditorcvn.callback = function() {
                            window.upeditorcvnResult =
                                new $.upeResult(outs[window.upeditorcvn.settings.pgeWindowID].enstr, window.upeditorcvn.settings.errMapping);
                            window.upeditorResultMachine = new $.upeResult(outs[window.upeditorcvn.settings.pgeWindowID].mac, window.upeditorcvn.settings.errMapping)
                        };
                        $.formValidator.getInitConfig("1").pageUPEditor = [window.upeditorcvn]
                    }
                }
                return true
            },
            onError: function(a) {
                return cardPaySubmitonError(a)
            },
            onSuccess: function() {
                return cardPaySubmitonSuccess()
            }
        });
        !0 == a.displayCardInfo.existsTips && null != a.phoneNumber && bankTipsOpen();
        removeAgreementValiFun = function() {
            $(".Card_agr").hide();
            $("#btnCardPay").val($.getI18Text("cardpay_ensurepay_name"));
            $("#isCheckAgreement").removeFormValidator({
                validatorGroup: "1"
            })
        };
        0 < $("#showCCBAggrement").length && (!$("#CCBAggrement").is(":hidden") && "true" == $("#showCCBAggrement").val()) && addCCBAgreementValiFun();
        if (null != a.phoneNumber && "Propay" == a.sourceType && "true" == $("#verifyPolicys_smsCode").val() || "true" == a.fromBankOpenCard) removeShowCardValiFun(), removeAgreementValiFun();
        else if ((null != a.phoneNumber ||
                "Propay" != a.sourceType) && !0 != a.displayCardInfo.existsTips) showCardValiFun(), "true" == $("#foreignMerchant").val() && ("true" == $("#verifyPolicys_cvn2").val() ? ($(".CardCVN2").show(), $("#cvn2").formValidator({
            onShowText: "",
            onShow: $.getI18Text("upop_cvn2_tips"),
            onFocus: $.getI18Text("upop_cvn2_tips"),
            onCorrect: $.getI18Text("upop_cvn2_tips"),
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, c) {
                if (a == "") {
                    c.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                    return false
                }
                if (a.replace(/[ ]/g, "").length < 3) {
                    c.settings[1].onError =
                        $.getI18Text("upop_cvn2_tips");
                    return false
                }
            },
            onError: $.getI18Text("upop_cvn2_tips")
        })) : $("#cvn2").removeFormValidator({
            validatorGroup: "1"
        }));
        0 < $(".Card_agr").length && !$(".Card_agr").is(":hidden") && addAgreementValiFun();
        "MOBILE_AND_SMSCODE" == a.displayCardInfo.mobileDisplayMode && ("true" == $("#verifyPolicys_smsCode").val() ? addBankSmsCodeValiFun() : addSmsCodeValiFun());
        null != a.phoneNumber && "Propay" == a.sourceType && "true" == $("#verifyPolicys_smsCode").val() ? removeCaptchaCodeValiFun() : ("Propay" != a.sourceType ||
            null != a.phoneNumber) && !0 != a.displayCardInfo.existsTips && addCaptchaCodeValiFun();
        ("NewCard" == a.sourceType || null != a.phoneNumber || "PayAndOpenCard" == a.sourceType) && $("#cellPhoneNumber").uptelephone().upcardTelephoneValidate().functionValidator({
            fun: function(a, c) {
                window.UPOP.DisCount && window.UPOP.DisCount.phoneRefresh(a, c);
                return true
            },
            onError: ""
        });
        $("#captchaImg").click(function() {
            $(this).attr("src", UPOP.contextPath + "/checkcode.action?r=" + Math.random())
        });
        $("#btnGetCode").click(function() {
            UPOP.acpAgent !=
                "pad" && (window.upeditoratm.osBrowser == 10 || window.upeditoratm.osBrowser == 11) ? $(".debitCard").is(":hidden") ? !$(".cvnobject").is(":hidden") && $("#foreignMerchant").val() != "true" ? window.upeditorcvn.result(addUPEditorValiFun.genSeedCode(), function() {
                    window.upeditorcvnResult = new $.upeResult(outs[window.upeditorcvn.settings.pgeWindowID].enstr, window.upeditorcvn.settings.errMapping);
                    cardPaySMSCodeSend(UPOP.contextPath, UPOP.transNumber)
                }) : cardPaySMSCodeSend(UPOP.contextPath, UPOP.transNumber) : window.upeditoratm.result(addUPEditorValiFun.genSeedCode(),
                    function() {
                        window.upeditoratmResult = new $.upeResult(outs[window.upeditoratm.settings.pgeWindowID].enstr, window.upeditoratm.settings.errMapping);
                        cardPaySMSCodeSend(UPOP.contextPath, UPOP.transNumber)
                    }) : cardPaySMSCodeSend(UPOP.contextPath, UPOP.transNumber)
        });
        UPOP.reopenBankCard = function() {
            if (a.logined) {
                var b = a.login.union_user_url_prex + "/ucsso/rest/obtain?callback=?";
                $.uppopUnionLogin({
                    title: a.login.title,
                    popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
                    loginStatusUrl: b,
                    proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
                    registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" + a.login.union_user_upop_infSource,
                    callBackFun: function(a) {
                        a == "n" ? $.getJSON(b, {}, function(a) {
                            $("#loginName").val() == a ? $("#cardPayForm").submit() : window.location.href = UPOP.contextPath + "/showCard.action?transNumber=" + UPOP.transNumber
                        }) : $("#cardPayForm").submit()
                    }
                })
            } else $("#cardPayForm").submit()
        };
        $("#return57supportauth").click(function() {
            UPOP.reopenBankCard()
        });
        $(".pop_login").upssoUnionLogin({
            title: a.login.title,
            popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
            loginStatusUrl: a.login.union_user_url_prex + "/ucsso/rest/obtain?callback=?",
            proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
            registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" + a.login.union_user_upop_infSource,
            callBackFun: function() {
                $("#showCardForm").length >
                    0 && $("#showCardForm").submit()
            }
        });
        $(".integral_icon").upssoUnionLogin({
            title: a.login.title,
            popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
            loginStatusUrl: a.login.union_user_url_prex + "/ucsso/rest/obtain?callback=?",
            proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
            registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" + a.login.union_user_upop_infSource,
            callBackFun: function() {
                $("#showCardForm").length > 0 && $("#showCardForm").submit()
            }
        });
        try {
            $(".view_ebanknum").hide(), $.ajax({
                dataType: "script",
                cache: !0,
                url: UPOP.url_prex_static_https + "/page/bankLimitTips/" + UPOP.localeStr + "/bank_" + netBankTipsCode + ".js"
            }).done(function() {
                if ($(".ebank_tips table[bankcode=" + netBankTipsCode + "]").length == 0) {
                    var a = $(UPOP.bankTipsHTML).addClass("ebank_norm");
                    $(".ebank_tips div").append(a)
                }
                $(".ebank_tips table[bankcode=" + netBankTipsCode + "]").length == 0 ? $(".ebank_tips table").hide() :
                    $(".view_ebanknum").show()
            })
        } catch (d) {}
        cardPayPhoneTips();
        "true" == $("#fromBankOpenCard").val() && "true" != $("#fromUserLogin").val() && $(".getMoible a").addClass("dn");
        "03340000" == a.displayCardInfo.bankNo && "DebitCard" == a.displayCardInfo.displayCardType ? $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BOP")) : ("04031000" == a.displayCardInfo.bankNo || "04721460" == a.displayCardInfo.bankNo) && "DebitCard" == a.displayCardInfo.displayCardType && $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BJB"))
    });
    "pad" == UPOP.acpAgent ? $(document).ready(function() {
        $("#debitCard_password").append(window.padPassword.getInstance({
            type: "atm",
            valiCallback: function(d) {
                d ? $(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips")) : $(".CardPwdText").addClass("txt_error").html(a.errMappingPassword["05"])
            }
        }).render());
        $("#credit_cvn2").append(window.padPassword.getInstance({
            type: "cvn2"
        }).render())
    }) : (window.upeditorcvn = new $.upe({
        upePath: UPOP.PATH_URL,
        upeId: "_ocx_cvn2",
        upeSk: a.secureKey,
        upeEdittype: 0,
        upeMode: "0010",
        upeMinlength: 3,
        upeMaxlength: 3,
        upePwdMode: 3,
        upeTabindex: 4,
        upeClass: "ocx_styleCvn2",
        upeObjClass: "",
        upeInstallClass: "ocx_styleCvn2_install",
        resp: "80",
        errMapping: $.extend(a.errMapping, a.errMappingCVN2),
        upeFontName: "Arial Black",
        upeFontSize: 25,
        upeNextElementId: "cellPhoneNumber",
        enterCallback: null,
        tabCallback: null,
        pgeWindowID: "password" + (new Date).getTime() + 2,
        pgeRZRandNum: a.sKey,
        pgeRZDataB: a.enStr
    }), window.upeditoratm = new $.upe({
        upePath: UPOP.PATH_URL,
        upeId: "_ocx_password",
        upeSk: a.secureKey,
        upeEdittype: 0,
        upeMode: "0010",
        upeMinlength: 6,
        upeMaxlength: 6,
        upePwdMode: 1,
        upeTabindex: 4,
        upeClass: "ocx_atm",
        upeObjClass: "",
        upeInstallClass: "ocx_atm_install",
        resp: "80",
        errMapping: $.extend(a.errMapping, a.errMappingPassword),
        upeFontName: "Arial Black",
        upeFontSize: 25,
        upeCertIndex: a.upedit_cert_index,
        upeNextElementId: "cellPhoneNumber",
        enterCallback: null,
        tabCallback: null,
        pgeWindowID: "password" + (new Date).getTime() + 1,
        pgeRZRandNum: a.sKey,
        pgeRZDataB: a.enStr
    }), up.UPEditInstall.bind(window.upeditoratm, {
        imagePath: UPOP.PATH_STATIC_I18 +
            "/images/global/"
    }), up.UPEditInstall.bind(window.upeditorcvn, {
        imagePath: UPOP.PATH_STATIC_I18 + "/images/global/"
    }), $("#debitCard_password").append(window.upeditoratm.load()), "true" != $("#foreignMerchant").val() && $("#credit_cvn2").append(window.upeditorcvn.load()), window.pgeCtrl = window.upeditoratm, $(function() {
        window.upeditorcvn.refresh4IE();
        window.upeditoratm.refresh4IE()
    }), $(document).ready(function() {
        window.showUPEditInstall = function() {
            setTimeout(function() {
                up.UPEditInstall.show(UPOP.PATH_STATIC_I18 +
                    "/images/global/")
            }, 100)
        };
        window.upeditoratm.checkInstall() && (0 < $("#content-tips-smscode").length && !$("#content-tips-smscode").is(":hidden") ? 0 < $("#content-tips-security").length && $("#content-tips-security").hide() : 0 < $("#content-tips-security").length && $("#content-tips-security").show())
    }));
    a.orderInfoUpoint && !0 == a.orderInfoUpoint.topPointOpen && !0 == a.logined && window.DiscountRelative && window.DiscountRelative.main(a)._topPointOpen();
    $(document).ready(function() {
        (new UPMicroRender).render({
            type: $("#restrictPayDisplay").val(),
            queryId: $("#restrictPayQueryId").val(),
            sourceType: $("#initSourceType").val(),
            existsTips: $("#existsTips").val()
        });
        (new UPMerPayControlRender).render({
            white: $("#data-mcp-white").val(),
            black: $("#data-mcp-black").val(),
            target: $("#mer-pay-ctrl-info")
        });
        if (a.displayCardInfo.displayCardType == "DebitCard" && a.displayCardInfo.existsTips == true) {
            $(".list").addClass("list_otherBank4upopPay");
            var d = document.createElement("iframe");
            d.src = UPOP.url_prex_static_https + "/page/otherBank4upopPay/" + UPOP.localeStr + "/565.html";
            d.scrolling = "no";
            d.frameBorder = "0";
            d.width = "100%";
            d.height = "105px";
            document.getElementById("otherBank4upopPay").appendChild(d)
        }
        a.displayCardInfo.instalmentOptionsAble == true && (a.displayCardInfo.existsTips == false && a.displayCardInfo.displayCardType == "CreditCard") && UPInstallmentRender.show({
            bankNo: $("#bankNo").val()
        })
    })
})(window.cardPayParam);
(function(a) {
    if (!a) return null;
    a.orderInfoUpoint && !0 == a.orderInfoUpoint.show && window.DiscountRelative && window.DiscountRelative.main(a);
    a.orderInfoUpoint && !0 == a.orderInfoUpoint.upointBizOpen && !0 == a.logined && window.DiscountRelative && window.DiscountRelative.main(a)._upointBizOpen();
    $(document).ready(function() {
        function d() {
            !1 == f && ($(".mb_dir").hide(), window.clearInterval(c))
        }
        UPOP.actionPreURL = UPOP.contextPath;
        UPOP.preURL = UPOP.url_prex_static_https;
        (new UPAgreementRender).render({
            type: $("#aggrementType").val(),
            descName: $("#aggrementDesc").val(),
            bankNo: $("#bankNo").val(),
            cardType: $("#cardType").val(),
            preURL: UPOP.url_prex_static_https
        });
        "03100000" == a.displayCardInfo.bankNo && "DebitCard" == a.displayCardInfo.displayCardType && $.setI18Text("mobilephone_onFocus_tips", $.getI18Text("mobilephone_pufa_onFocus_tips"));
        a.hasActionErrors && $(".list").css("padding-top", "20px");
        netBankTipsCode = a.displayCardInfo.netBankResult.bankCode;
        addAgreementValiFun = function() {
            $(".Card_agr").show();
            $("#isCheckAgreement").upCheckAgreementValidate()
        };
        bankTipsOpen = function() {
            $(".bankinfo").hide();
            $(".cardmsg").show();
            showCardValiFun();
            $(".CardMobile").show();
            $("#cardPay_all_need").show();
            "PayAndOpenCard" != $("#sourceType").val() && addAgreementValiFun()
        };
        if (!0 == a.displayCardInfo.existsTips && ("OPEN_NET_BANK" == a.displayCardInfo.tipsVO.forwardType || "RESERVE_PHONE" == a.displayCardInfo.tipsVO.forwardType)) $("#btnUnopenYc").click(function() {
            $(".unopenYc_pop").modal({
                containerId: "simplemodal-container2"
            });
            var a = (UPOPUtils.getWinWidth() - 700) / 2,
                b = (UPOPUtils.getWinHeight() -
                    430) / 2;
            $("#simplemodal-container2").css({
                width: "700px",
                height: "430px",
                left: a + "px",
                top: b + "px",
                padding: "0",
                overflow: "hidden"
            })
        }), $(".btn_gowww").click(function() {
            $(".gowrap").hide();
            $(".btn_goafter").show();
            window.open(a.displayCardInfo.tipsVO.url)
        });
        $("#btnCardPay").mousedown(function() {
            setTimeout(function() {
                $("#cardPay").submit()
            }, 100)
        });
        $.formValidator.initConfig({
            formID: "cardPay",
            mode: UPOP.VALIDATOR.TIP_MODE.FixTip,
            validatorGroup: "1",
            preSubmit: function() {
                "NewCard" != $("#sourceType").val() ? $("#cardPay").attr("action",
                    UPOP.contextPath + "/cardPay.action?transNumber=" + UPOP.transNumber) : $("#cardPay").attr("action", UPOP.contextPath + "/bankOpenCard.action?transNumber=" + UPOP.transNumber);
                if ("pad" != UPOP.acpAgent && (10 == window.upeditoratm.osBrowser || 11 == window.upeditoratm.osBrowser)) {
                    var a = $("#vc_key_seed").val();
                    $(".debitCard").is(":hidden") || (window.upeditoratm.keyName = a, window.upeditoratm.callback = function() {
                        window.upeditoratmResult = new $.upeResult(outs[window.upeditoratm.settings.pgeWindowID].enstr, window.upeditoratm.settings.errMapping);
                        window.upeditorResultMachine = new $.upeResult(outs[window.upeditoratm.settings.pgeWindowID].mac, window.upeditoratm.settings.errMapping)
                    }, $.formValidator.getInitConfig("1").pageUPEditor = [window.upeditoratm]);
                    !$(".cvnobject").is(":hidden") && "true" != $("#foreignMerchant").val() && (window.upeditorcvn.keyName = a, window.upeditorcvn.callback = function() {
                        window.upeditorcvnResult = new $.upeResult(outs[window.upeditorcvn.settings.pgeWindowID].enstr, window.upeditorcvn.settings.errMapping);
                        window.upeditorResultMachine =
                            new $.upeResult(outs[window.upeditorcvn.settings.pgeWindowID].mac, window.upeditorcvn.settings.errMapping)
                    }, $.formValidator.getInitConfig("1").pageUPEditor = [window.upeditorcvn])
                }
                return !0
            },
            onError: function() {
                ("" == $("#expireYear").val() || "" == $("#expireMonth").val()) && $.formValidator.setTipMsg($("#expireMonthTip").get(0), "onError", $.getI18Text("cvn2_onerror"));
                $("#captchaCode").is(":hidden") || $.formValidator.areaIsValid("1", [$("#captchaCode").get(0)]) && $("#captchaCodeTip").hide();
                if ("pad" == UPOP.acpAgent) 0 <
                    $("#pad_atm_password").length && !1 == $("#pad_atm_password").is(":hidden") ? 6 == $("#pad_atm_password").html().length ? $(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips")) : $(".CardPwdText").addClass("txt_error").html($.getI18Text("upeditor_msg_password_05")) : 0 < $("#padCvn2").length && !1 == $("#padCvn2").is(":hidden") && (3 == $("#padCvn2").val().length ? ($(".CardCvnText").removeClass("txt_error").html($.getI18Text("upop_cvn2_tips")), $("#cvn2").val(window.padPassword.userCvn2Encrypt($("#padCvn2").val()))) :
                        ($(".CardCvnText").addClass("txt_error").html($.getI18Text("upop_cvn2_tips")), $("#padCvn2").addClass("txterror")));
                else if (10 == window.upeditoratm.osBrowser || 11 == window.upeditoratm.osBrowser) {
                    if ("true" != $("#foreignMerchant").val() && !$(".cvnobject").is(":hidden")) {
                        var b = window.upeditorcvnResult;
                        b.isError() ? $(".CardCvnText").addClass("txt_error").html(b.errMsg()) : $(".CardCvnText").removeClass("txt_error").html(a.pleaseinputcvn2)
                    }
                    $(".debitCard").is(":hidden") || (b = window.upeditoratmResult, b.isError() ?
                        $(".CardPwdText").addClass("txt_error").html(b.errMsg()) : $(".CardPwdText").removeClass("txt_error").html(a.pleaseinputpassword))
                } else {
                    var c = $("#vc_key_seed").val();
                    "true" != $("#foreignMerchant").val() && !$(".cvnobject").is(":hidden") && (b = upeditorcvn.result(c), b.isError() ? $(".CardCvnText").addClass("txt_error").html(b.errMsg()) : $(".CardCvnText").removeClass("txt_error").html(a.pleaseinputcvn2));
                    $(".debitCard").is(":hidden") || (b = upeditoratm.result(c), b.isError() ? $(".CardPwdText").addClass("txt_error").html(b.errMsg()) :
                        $(".CardPwdText").removeClass("txt_error").html(a.pleaseinputpassword))
                }
                return !1
            },
            onSuccess: function() {
                if (0 < $("#upoint_display").length && 0 < $("#upoint").length && !$("#upoint_display").is(":hidden")) {
                    if (!$(".order_u_info").is(":hidden")) return $("html,body").animate({
                        scrollTop: $(".order_main").offset().top
                    }, 500), !1;
                    var a = $("#upoint_display").val() * UPOP.currencyIndexMIN;
                    if (Math.round(a) < $("#upointMinValue").val()) return $(".order_u_info").addClass("txt_error").show().html($.getI18Text("paySuccess_fastReg_udikou") +
                        $("#upointMinValue").val() + $.getI18Text("paySuccess_fastReg_upoint")), $("html,body").animate({
                        scrollTop: $(".order_main").offset().top
                    }, 500), !1;
                    $("#upoint").val(Math.round($("#upoint_display").val() * UPOP.currencyIndexMIN))
                } else 0 < $("#upoint_display").length && (0 < $("#upoint").length && $("#upoint_display").is(":hidden")) && $("#upoint").val("0");
                var a = $("#vc_key_seed").val(),
                    b;
                0 < $("#cellPhoneNumber").length && (b = $("#cellPhoneNumber").val().replace(/[ ]/g, ""));
                $("#cellPhoneNumber").is(":hidden") || $("#phoneNumber").val(b);
                $("#captchaCodeTip").hide();
                b = !0;
                if ("pad" == UPOP.acpAgent) 0 < $("#pad_atm_password").length && !1 == $("#pad_atm_password").is(":hidden") ? 6 == $("#pad_atm_password").html().length ? ($(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips")), b = !0) : ($(".CardPwdText").addClass("txt_error").html($.getI18Text("upeditor_msg_password_05")), b = !1) : 0 < $("#padCvn2").length && !1 == $("#padCvn2").is(":hidden") && (3 == $("#padCvn2").val().length ? ($(".CardCvnText").removeClass("txt_error").html($.getI18Text("upop_cvn2_tips")),
                    $("#cvn2").val(window.padPassword.userCvn2Encrypt($("#padCvn2").val())), b = !0) : ($(".CardCvnText").addClass("txt_error").html($.getI18Text("upop_cvn2_tips")), $("#padCvn2").addClass("txterror"), b = !1));
                else if (10 == window.upeditoratm.osBrowser || 11 == window.upeditoratm.osBrowser) {
                    "true" != $("#foreignMerchant").val() && !$(".cvnobject").is(":hidden") && (b = window.upeditorcvnResult, b.isError() ? ($(".CardCvnText").addClass("txt_error").html(b.errMsg()), b = !1) : ($("#cvn2").val(b.cypher), b = !0));
                    if (!$(".debitCard").is(":hidden")) {
                        var c =
                            window.upeditoratmResult;
                        c.isError() ? ($(".CardPwdText").addClass("txt_error").html(c.errMsg()), b = !1) : ($("#atmPassword").val(c.cypher), b = b && !0)
                    }
                    "true" == $("#skipPwd").val() && (b = !0);
                    b && ($("#cardPay").unbind(), $("#cardPay").submit())
                } else if ("true" != $("#foreignMerchant").val() && !$(".cvnobject").is(":hidden") && (b = upeditorcvn.result(a), b.isError() ? ($(".CardCvnText").addClass("txt_error").html(b.errMsg()), b = !1) : ($("#cvn2").val(b.cypher), b = !0)), !$(".debitCard").is(":hidden")) c = upeditoratm.result(a), c.isError() ?
                    ($(".CardPwdText").addClass("txt_error").html(c.errMsg()), b = !1) : ($("#atmPassword").val(c.cypher), b = b && !0);
                try {
                    var d = upeditorMachineInfo.machineInfo(a);
                    $("#machineInfo").val(d.cypher)
                } catch (f) {}
                return "true" == $("#skipPwd").val() ? !0 : b
            }
        });
        !0 == a.displayCardInfo.existsTips && null != a.phoneNumber && bankTipsOpen();
        !0 == a.displayCardInfo.existsTips && null == a.phoneNumber && ($(".payrow").attr("originalHeight", $(".payrow").height()), $(".payrow").height($(".bankinfo").height()));
        if ((null != a.phoneNumber || "Propay" != a.sourceType) &&
            !0 != a.displayCardInfo.existsTips) showCardValiFun(), "true" == $("#foreignMerchant").val() && ("true" == $("#verifyPolicys_cvn2").val() ? ($(".CardCVN2").show(), $("#cvn2").formValidator({
            onShowText: "",
            onShow: $.getI18Text("upop_cvn2_tips"),
            onFocus: $.getI18Text("upop_cvn2_tips"),
            onCorrect: $.getI18Text("upop_cvn2_tips"),
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, b) {
                if (a == "") {
                    b.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                    return false
                }
                if (a.replace(/[ ]/g, "").length < 3) {
                    b.settings[1].onError = $.getI18Text("upop_cvn2_tips");
                    return false
                }
            },
            onError: $.getI18Text("upop_cvn2_tips")
        })) : $("#cvn2").removeFormValidator({
            validatorGroup: "1"
        }));
        $(".Card_agr").is(":hidden") || addAgreementValiFun();
        addForeignValiFun = function() {
            $("#cellPhoneNumber").removeFormValidator({
                validatorGroup: "1"
            });
            if ($("#areaCode").val() == "86") $("#cellPhoneNumber").uptelephone().upcardTelephoneValidate();
            else {
                $("#cellPhoneNumber").unbind();
                $("#cellPhoneNumber").upbankcard().formValidator({
                    onShowText: "",
                    onShow: $.getI18Text("mobilephone_onFocus_tips"),
                    onFocus: $.getI18Text("mobilephone_onFocus_tips"),
                    onCorrect: $.getI18Text("mobilephone_onFocus_tips"),
                    validatorGroup: "1",
                    valiCallback: function(a, b) {
                        if (b.isValid) {
                            $("#cellPhoneNumberTip").find("div").removeClass().addClass("text_c CardSmsText text_c_height").html(a.settings[0].onShow);
                            return true
                        }
                        $(a).val() != "" && $("#cellPhoneNumberTip").find("div").removeClass().addClass("text_c CardSmsText txt_error").html(a.settings[1].onError);
                        return false
                    }
                }).functionValidator({
                    fun: function(a, b) {
                        var c = a.replace(/[ ]/g, "");
                        if (c.length < 4 || c.length > 15) {
                            b.settings[1].onError =
                                c.replace(/[\d]/g, "") != "" ? $.getI18Text("foreignPhone_error_tips") : $.getI18Text("foreignPhone_error_limit");
                            return false
                        }
                        if (UPOP.VALIDATOR.REGEX.foreignPhone.test(a.replace(/[ ]/g, ""))) return true;
                        b.settings[1].onError = $.getI18Text("foreignPhone_error_tips");
                        return false
                    },
                    onError: $.getI18Text("foreignPhone_error_tips")
                })
            }
        };
        $("#areaCode").change(function() {
            addForeignValiFun()
        });
        removeAgreementValiFun = function() {
            $(".Card_agr").hide();
            $("#isCheckAgreement").removeFormValidator({
                validatorGroup: "1"
            })
        };
        $("#smsCode").upnumeral().formValidator({
            onShowText: "",
            onShow: $.getI18Text("smsCode_input_tips"),
            onShowCallBack: function() {
                return $("#smsCodeTip").find("span").length == 0 ? true : false
            },
            onFocus: $.getI18Text("smsCode_input_tips"),
            onFocusCallBack: function() {
                return $("#smsCodeTip").find("span").length == 0 ? true : false
            },
            onCorrect: $.getI18Text("smsCode_input_tips"),
            onErrorCallBack: function() {
                return $("#smsCodeTip").find("span").length == 0 ? true : false
            },
            validatorGroup: "1"
        }).functionValidator({
            fun: function(a, b) {
                if (a ==
                    "") {
                    b.settings[1].onError = $.getI18Text("smsCode_must_tips");
                    return false
                }
                var c = a.replace(/[ ]/g, "");
                if (c.length < 6) {
                    b.settings[1].onError = c.replace(/[\d]/g, "") != "" ? $.getI18Text("smsCode_error_tips") : $.getI18Text("smsCode_error_limit");
                    return false
                }
                if (UPOP.VALIDATOR.REGEX.smsCode.test(a.replace(/[ ]/g, ""))) return true;
                b.settings[1].onError = $.getI18Text("smsCode_error_tips");
                return false
            },
            onError: $.getI18Text("smsCode_error_tips")
        });
        !0 == a.displayCardInfo.showCaptcha && ($("#captchaCode").upcaptchaValidate().blur(function() {
            !$("#captchaCode").val() ||
                $.formValidator.areaIsValid("1", [$("#captchaCode").get(0)]) ? $("#captchaCodeTip").hide() : $("#captchaCodeTip").show()
        }).focus(function() {
            $("#captchaCodeTip").hide()
        }), $("#captchaCodeTip").hide(), $("#captchaImg").click(function() {
            $(this).attr("src", UPOP.contextPath + "/checkcode.action?r=" + Math.random())
        }));
        ("NewCard" == a.sourceType || "Litepay" == a.sourceType && null != a.phoneNumber) && $("#cellPhoneNumber").uptelephone().upcardTelephoneValidate();
        $("#btnGetCode").click(function() {
            var a;
            if ($("#sourceType").val() ==
                "NewCard" || $("#sourceType").val() == "PayAndOpenCard" || $("#conversionType").val() == "Litepay2PayAndOpenCard") {
                if (!$.formValidator.areaIsValid("1", [$("#cellPhoneNumber").get(0)])) return false;
                a = {
                    transNumber: UPOP.transNumber,
                    cardNumber: $("#cardNumber").val(),
                    phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, ""),
                    sourceType: $("#sourceType").val()
                }
            } else if ($("#sourceType").val() == "Propay") a = {
                transNumber: UPOP.transNumber,
                bindId: $("#bindId").val(),
                sourceType: $("#sourceType").val()
            };
            else if ($("#initSourceType").val() ==
                "Litepay")
                if ($("#verifyPolicys_smsCode").val() == "true" && !$("#cellPhoneNumber").is(":hidden")) {
                    if (!$.formValidator.areaIsValid("1", [$("#cellPhoneNumber").get(0)])) return false;
                    a = {
                        transNumber: UPOP.transNumber,
                        cardNumber: $("#cardNumber").val(),
                        phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, ""),
                        sourceType: $("#sourceType").val()
                    }
                } else a = {
                    transNumber: UPOP.transNumber,
                    cardNumber: $("#cardNumber").val(),
                    phoneNumber: "",
                    sourceType: $("#sourceType").val()
                };
            var b = "";
            if ($("#verifyPolicys_smsCode").val() ==
                "true") {
                $("#smsCode_ajax_loading").show();
                a.messageType = "bind";
                b = UPOP.contextPath + "/ajax/bankSMS.action?r=" + Math.random()
            } else b = UPOP.contextPath + "/ajax/cardPaySMS!send.action?r=" + Math.random();
            $("#btnGetCode").addClass("yzm_btn_dis");
            $("#btnGetCode").val("\u5df2\u53d1\u9001").attr("disabled", "disabled");
            UPService.send(b, "text", a, {
                    onSuccess: function(a) {
                        var a = $.parseJSON(a),
                            b = a.success;
                        if ($("#verifyPolicys_smsCode").val() == "true")
                            if (b) {
                                $("#SMSBankCode_QID").val(a.message);
                                (new UPBankSMS).exec({
                                    qid: $("#SMSBankCode_QID").val(),
                                    phoneNumber: $("#cellPhoneNumber").val().replace(/[ ]/g, "")
                                }, UPOP.contextPath + "/ajax/checkBankSms.action?r=" + Math.random() + "&transNumber=" + UPOP.transNumber, "cardPay")
                            } else {
                                $("#smsCode_ajax_loading").hide();
                                $.formValidator.setTipState($("#smsCode").get(0), "onError", a.message);
                                $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                                $("#btnGetCode").val("\u91cd\u65b0\u83b7\u53d6")
                            }
                        else if (b) {
                            UPOPUtils.sendMsgCallBack($("#btnGetCode"), $("#smsCodeTip"));
                            $(".notice_fail").hide();
                            $(".notice_alarm").hide();
                            $(".notice_alarm_blue").show()
                        } else {
                            $.formValidator.setTipState($("#smsCode").get(0), "onError", a.message);
                            $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                            $("#btnGetCode").val("\u91cd\u65b0\u83b7\u53d6")
                        }
                    },
                    onFail: function() {
                        $("#smsCode_ajax_loading").length > 0 && $("#smsCode_ajax_loading").hide();
                        $.formValidator.setTipState($("#smsCode").get(0), "onError", $.getI18Text("smsCode_error"));
                        $("#btnGetCode").removeClass("yzm_btn_dis").removeAttr("disabled");
                        $("#btnGetCode").val("\u91cd\u65b0\u83b7\u53d6")
                    }
                },
                true)
        });
        $("#return57supportauth").click(function() {
            if (a.logined == false) {
                var b = a.login.union_user_url_prex + "/ucsso/rest/obtain?callback=?";
                $.uppopUnionLogin({
                    title: a.login.title,
                    popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
                    loginStatusUrl: b,
                    proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
                    registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" +
                        a.login.union_user_upop_infSource,
                    callBackFun: function(a) {
                        a == "n" ? $.getJSON(b, {}, function(a) {
                            $("#loginName").val() == a ? $("#cardPayForm").submit() : window.location.href = UPOP.contextPath + "/showCard.action?transNumber=" + UPOP.transNumber
                        }) : $("#cardPayForm").submit()
                    }
                })
            } else $("#cardPayForm").submit()
        });
        $(".pop_login").upssoUnionLogin({
            title: a.login.title,
            popupUrl: a.login.union_user_url_prex + "/pages/upol/login_modal_" + a.localeStr + ".html?sysIdStr=" + a.login.union_user_upop_sysIdStr,
            loginStatusUrl: a.login.union_user_url_prex +
                "/ucsso/rest/obtain?callback=?",
            proxyUrl: a.url_upop + "/resources/upop/page/common/ssoProxy.html",
            registerUrl: a.login.union_user_url_prex + "/pages/reg/index.html?sysIdStr=" + a.login.union_user_upop_sysIdStr + "&infSource=" + a.login.union_user_upop_infSource,
            callBackFun: function() {
                $("#showCardForm").length > 0 && $("#showCardForm").submit()
            }
        });
        try {
            $(".view_ebanknum").hide(), $.ajax({
                dataType: "script",
                cache: !0,
                url: UPOP.url_prex_static_https + "/page/bankLimitTips/" + UPOP.localeStr + "/bank_" + netBankTipsCode + ".js"
            }).done(function() {
                if ($(".ebank_tips table[bankcode=" +
                        netBankTipsCode + "]").length == 0) {
                    var a = $(UPOP.bankTipsHTML).addClass("ebank_norm");
                    $(".ebank_tips div").append(a)
                }
                $(".ebank_tips table[bankcode=" + netBankTipsCode + "]").length == 0 ? $(".ebank_tips table").hide() : $(".view_ebanknum").show()
            })
        } catch (b) {}
        var c = null,
            f = !1;
        $(".mbtips").mouseover(function() {
            $("#cancelmobileid").length > 0 && !$("#cancelmobileid").is(":hidden") ? $(".mb_dir").css("left", "315px") : $(".mb_dir").css("left", "225px");
            $(".mb_dir").show().css("visibility", "hidden");
            setTimeout(function() {
                $(".mb_dir").css("visibility",
                    "visible")
            }, 1);
            window.clearInterval(c)
        }).mouseout(function() {
            c = window.setInterval(d, 500)
        });
        $(".mb_dir").mouseover(function() {
            f = true
        }).mouseout(function() {
            f = false
        });
        "03340000" == a.displayCardInfo.bankNo && "DebitCard" == a.displayCardInfo.displayCardType ? $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BOP")) : ("04031000" == a.displayCardInfo.bankNo || "04721460" == a.displayCardInfo.bankNo) && "DebitCard" == a.displayCardInfo.displayCardType && $.setI18Text("upop_bankcard_tips", $.getI18Text("upop_bankcard_tips_BJB"));
        (new UPMicroRender).render({
            type: $("#restrictPayDisplay").val(),
            queryId: $("#restrictPayQueryId").val(),
            sourceType: $("#initSourceType").val(),
            existsTips: $("#existsTips").val()
        });
        (new UPMerPayControlRender).render({
            white: $("#data-mcp-white").val(),
            black: $("#data-mcp-black").val(),
            target: $("#mer-pay-ctrl-info")
        });
        "pad" == UPOP.acpAgent ? $(document).ready(function() {
            $("#debitCard_password").append(window.padPassword.getInstance({
                type: "atm",
                valiCallback: function(b) {
                    b ? $(".CardPwdText").removeClass("txt_error").html($.getI18Text("upop_bankcard_tips")) :
                        $(".CardPwdText").addClass("txt_error").html(a.errMappingPassword["05"])
                }
            }).render());
            $("#credit_cvn2").append(window.padPassword.getInstance({
                type: "cvn2"
            }).render())
        }) : (window.upeditorcvn = new $.upe({
                upePath: UPOP.PATH_URL,
                upeId: "_ocx_cvn2",
                upeSk: a.secureKey,
                upeEdittype: 0,
                upeMode: "0010",
                upeMinlength: 3,
                upeMaxlength: 3,
                upePwdMode: 3,
                upeTabindex: 4,
                upeClass: "ocx_styleCvn2",
                upeObjClass: "",
                upeInstallClass: "ocx_styleCvn2_install",
                resp: "80",
                errMapping: $.extend(a.errMapping, a.errMappingCVN2),
                upeFontName: "Arial Black",
                upeFontSize: 25,
                upeNextElementId: "cellPhoneNumber",
                enterCallback: null,
                tabCallback: null,
                pgeWindowID: "password" + (new Date).getTime() + 2,
                pgeRZRandNum: a.sKey,
                pgeRZDataB: a.enStr
            }), window.upeditoratm = new $.upe({
                upePath: UPOP.PATH_URL,
                upeId: "_ocx_password",
                upeSk: a.secureKey,
                upeEdittype: 0,
                upeMode: "0010",
                upeMinlength: 6,
                upeMaxlength: 6,
                upePwdMode: 1,
                upeTabindex: 4,
                upeClass: "ocx_atm",
                upeObjClass: "",
                upeInstallClass: "ocx_atm_install",
                resp: "80",
                errMapping: $.extend(a.errMapping, a.errMappingPassword),
                upeFontName: "Arial Black",
                upeFontSize: 25,
                upeCertIndex: a.upedit_cert_index,
                upeNextElementId: "cellPhoneNumber",
                enterCallback: null,
                tabCallback: null,
                pgeWindowID: "password" + (new Date).getTime() + 1,
                pgeRZRandNum: a.sKey,
                pgeRZDataB: a.enStr
            }), up.UPEditInstall.bind(window.upeditoratm, {
                imagePath: UPOP.PATH_STATIC_I18 + "/images/global/"
            }), up.UPEditInstall.bind(window.upeditorcvn, {
                imagePath: UPOP.PATH_STATIC_I18 + "/images/global/"
            }), window.pgeCtrl = window.upeditoratm, $("#debitCard_password").append(window.upeditoratm.load()), "true" != $("#foreignMerchant").val() &&
            $("#credit_cvn2").append(window.upeditorcvn.load()), $(function() {
                window.upeditorcvn.refresh4IE();
                window.upeditoratm.refresh4IE();
                window.showUPEditInstall = function() {
                    setTimeout(function() {
                        up.UPEditInstall.show(UPOP.PATH_STATIC_I18 + "/images/global/")
                    }, 100)
                };
                window.upeditoratm.checkInstall() && $("#content-tips-security").length > 0 && $("#content-tips-security").show()
            }))
    })
})(window.cardPay4BankOpenParam);