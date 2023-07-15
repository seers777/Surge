/******************************

脚本功能：downs
下载地址：
软件版本：
更新时间：2023-7-15
问题反馈：QQ
QQ会员群：
TG反馈群：
TG频道群：
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/api\.adapty\.io\/api\/v1\/sdk\/analytics\/profiles url script-response-body https://raw.githubusercontent.com/89996462/Quantumult-X/main/ycdz/xmindv.js

[mitm] 

hostname = api.adapty.io

*******************************/
let obj = {
  "data": {
    "type": "adapty_inapps_apple_receipt_validation_result",
    "id": "1e3b14d1-a37e-4715-8fde-7bbb22bd9b9d",
    "attributes": {
      "app_id": "4ef6758f-1b3d-4e08-862f-1107c9683051",
      "profile_id": "1e3b14d1-a37e-4715-8fde-7bbb22bd9b9d",
      "customer_user_id": null,
      "total_revenue_usd": 0,
      "paid_access_levels": {
        "premium": {
          "id": "premium",
          "is_active": true,
          "is_lifetime": false,
          "expires_at": "2099-07-17T15:58:31.000000+0000",
          "starts_at": null,
          "will_renew": false,
          "vendor_product_id": "DownsSubscribeYear",
          "store": "app_store",
          "activated_at": "2023-07-14T15:58:32.000000+0000",
          "renewed_at": "2023-07-14T15:58:31.000000+0000",
          "unsubscribed_at": "2023-07-14T16:29:43.732253+0000",
          "billing_issue_detected_at": null,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "active_promotional_offer_type": null,
          "active_promotional_offer_id": null,
          "cancellation_reason": null,
          "is_refund": false
        }
      },
      "subscriptions": {
        "DownsSubscribeYear": {
          "is_active": true,
          "is_lifetime": false,
          "expires_at": "2099-07-17T15:58:31.000000+0000",
          "starts_at": null,
          "will_renew": false,
          "vendor_product_id": "DownsSubscribeYear",
          "vendor_transaction_id": "20001306150294",
          "vendor_original_transaction_id": "20001306150294",
          "store": "app_store",
          "activated_at": "2023-07-14T15:58:32.000000+0000",
          "renewed_at": "2023-07-14T15:58:31.000000+0000",
          "unsubscribed_at": "2023-07-14T16:29:43.729413+0000",
          "billing_issue_detected_at": null,
          "is_in_grace_period": false,
          "active_introductory_offer_type": "free_trial",
          "active_promotional_offer_type": null,
          "active_promotional_offer_id": null,
          "cancellation_reason": null,
          "is_sandbox": false,
          "is_refund": false
        }
      },
      "non_subscriptions": null,
      "custom_attributes": {},
      "apple_validation_result": {
        "environment": "Production",
        "receipt": {
          "receipt_type": "Production",
          "adam_id": 6446158209,
          "app_item_id": 6446158209,
          "bundle_id": "com.downs.ios",
          "application_version": "10",
          "download_id": 502605784969919360,
          "version_external_identifier": 856612721,
          "receipt_creation_date": "2023-07-14 16:31:49 Etc/GMT",
          "receipt_creation_date_ms": "1689352309000",
          "receipt_creation_date_pst": "2023-07-14 09:31:49 America/Los_Angeles",
          "request_date": "2023-07-14 18:40:56 Etc/GMT",
          "request_date_ms": "1689360056938",
          "request_date_pst": "2023-07-14 11:40:56 America/Los_Angeles",
          "original_purchase_date": "2023-07-14 14:31:32 Etc/GMT",
          "original_purchase_date_ms": "1689345092000",
          "original_purchase_date_pst": "2023-07-14 07:31:32 America/Los_Angeles",
          "original_application_version": "10",
          "in_app": [
            {
              "quantity": "1",
              "product_id": "DownsSubscribeYear",
              "transaction_id": "20001306150294",
              "original_transaction_id": "20001306150294",
              "purchase_date": "2023-07-14 15:58:31 Etc/GMT",
              "purchase_date_ms": "1689350311000",
              "purchase_date_pst": "2023-07-14 08:58:31 America/Los_Angeles",
              "original_purchase_date": "2023-07-14 15:58:32 Etc/GMT",
              "original_purchase_date_ms": "1689350312000",
              "original_purchase_date_pst": "2023-07-14 08:58:32 America/Los_Angeles",
              "expires_date": "2099-07-17 15:58:31 Etc/GMT",
              "expires_date_ms": "4096019658000",
              "expires_date_pst": "2099-07-17 08:58:31 America/Los_Angeles",
              "web_order_line_item_id": "20000558810234",
              "is_trial_period": "false",
              "is_in_intro_offer_period": "false",
              "in_app_ownership_type": "PURCHASED"
            }
          ]
        },
        "latest_receipt_info": [
          {
            "quantity": "1",
            "product_id": "DownsSubscribeYear",
            "transaction_id": "20001306150294",
            "original_transaction_id": "20001306150294",
            "purchase_date": "2023-07-14 15:58:31 Etc/GMT",
            "purchase_date_ms": "1689350311000",
            "purchase_date_pst": "2023-07-14 08:58:31 America/Los_Angeles",
            "original_purchase_date": "2023-07-14 15:58:32 Etc/GMT",
            "original_purchase_date_ms": "1689350312000",
            "original_purchase_date_pst": "2023-07-14 08:58:32 America/Los_Angeles",
            "expires_date": "2099-07-17 15:58:31 Etc/GMT",
            "expires_date_ms": "4096019658000",
            "expires_date_pst": "2099-07-17 08:58:31 America/Los_Angeles",
            "web_order_line_item_id": "20000558810234",
            "is_trial_period": "false",
            "is_in_intro_offer_period": "false",
            "in_app_ownership_type": "PURCHASED",
            "subscription_group_identifier": "21268591"
          }
        ],
        "latest_receipt": "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",
        "pending_renewal_info": [
          {
            "auto_renew_product_id": "DownsSubscribeYear",
            "product_id": "DownsSubscribeYear",
            "original_transaction_id": "20001306150294",
            "auto_renew_status": "0"
          }
        ],
        "status": 0
      },
      "promotional_offer_eligibility": false,
      "introductory_offer_eligibility": false
    }
  }
  }
  
  $done({body: JSON.stringify(obj)})
