"use client";
import * as React from "react";

/** @jsx jsx */
import { jsx } from "@emotion/react";

function SecondPage() {
  return (
    <div
      css={{
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "480px",
        width: "100%",
        paddingBottom: "89px",
        overflow: "hidden",
      }}
      className="second-page-container"
    >
      <div
        css={{
          backgroundColor: "rgba(214, 61, 110, 0.4)",
          paddingLeft: "43px",
          paddingRight: "43px",
          paddingTop: "56px",
          paddingBottom: "56px",
          fontFamily: "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
          fontSize: "20px",
          color: "rgba(0, 0, 0, 1)",
          fontWeight: "400",
          textAlign: "center",
        }}
        className="app-header"
      >
        MoCo Money Splitter for Friends
      </div>
      <div
        css={{
          display: "flex",
          marginTop: "57px",
          width: "100%",
          paddingLeft: "8px",
          paddingRight: "23px",
          flexDirection: "column",
          alignItems: "stretch",
        }}
        className="results-container"
      >
        <div
          css={{
            color: "rgba(0, 0, 0, 1)",
            fontSize: "15px",
            fontFamily:
              "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: "400",
            textAlign: "center",
            alignSelf: "center",
          }}
          className="results-description"
        >
          Here is the amount you have to pay each other
        </div>
        <div
          css={{
            display: "flex",
            marginTop: "55px",
            width: "100%",
            alignItems: "stretch",
            gap: "40px 60px",
            fontFamily:
              "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "15px",
            color: "rgba(0, 0, 0, 1)",
            fontWeight: "400",
            textAlign: "center",
          }}
          className="payment-row"
        >
          <div
            css={{
              alignSelf: "start",
              display: "flex",
              alignItems: "stretch",
              gap: "14px",
              flexGrow: "1",
              flexShrink: "1",
              flexBasis: "auto",
            }}
            className="payment-participants"
          >
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
              className="participant-from"
            >
              <div
                css={{
                  alignSelf: "start",
                  marginLeft: "11px",
                }}
                className="participant-label"
              >
                This person
              </div>
              <div
                css={{
                  borderRadius: "38px",
                  backgroundColor: "rgba(255, 188, 188, 1)",
                  display: "flex",
                  marginTop: "38px",
                  flexShrink: "0",
                  height: "37px",
                }}
                className="participant-input"
              />
            </div>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
              }}
              className="participant-to"
            >
              <div
                css={{
                  alignSelf: "center",
                }}
                className="to-label"
              >
                To{" "}
              </div>
              <div
                css={{
                  borderRadius: "38px",
                  backgroundColor: "rgba(255, 188, 188, 1)",
                  display: "flex",
                  marginTop: "45px",
                  flexShrink: "0",
                  height: "37px",
                }}
                className="participant-input"
              />
            </div>
          </div>
          <div
            css={{
              whiteSpace: "nowrap",
            }}
            className="amount-section"
          >
            <div className="amount-label">Amount</div>
            <div
              css={{
                backgroundColor: "rgba(217, 217, 217, 1)",
                borderRadius: "50%",
                marginTop: "34px",
                paddingLeft: "23px",
                paddingRight: "23px",
                paddingTop: "15px",
                paddingBottom: "27px",
                width: "50px",
                height: "50px",
              }}
              className="payment-number"
            >
              1
            </div>
          </div>
        </div>
        <div
          css={{
            display: "flex",
            marginTop: "25px",
            width: "100%",
            alignItems: "stretch",
            gap: "40px 64px",
          }}
          className="payment-row"
        >
          <div
            css={{
              display: "flex",
              marginTop: "auto",
              marginBottom: "auto",
              alignItems: "start",
              gap: "14px",
              flexGrow: "1",
              flexShrink: "1",
              flexBasis: "auto",
            }}
            className="payment-participants"
          >
            <div
              css={{
                borderRadius: "38px",
                backgroundColor: "rgba(255, 188, 188, 1)",
                display: "flex",
                width: "119px",
                flexShrink: "0",
                height: "37px",
              }}
              className="participant-input"
            />
            <div
              css={{
                borderRadius: "38px",
                backgroundColor: "rgba(255, 188, 188, 1)",
                display: "flex",
                width: "119px",
                flexShrink: "0",
                height: "37px",
              }}
              className="participant-input"
            />
          </div>
          <div
            css={{
              backgroundColor: "rgba(217, 217, 217, 1)",
              borderRadius: "50%",
              paddingLeft: "22px",
              paddingRight: "22px",
              paddingTop: "16px",
              paddingBottom: "26px",
              fontFamily:
                "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "15px",
              color: "rgba(0, 0, 0, 1)",
              fontWeight: "400",
              whiteSpace: "nowrap",
              textAlign: "center",
              width: "50px",
              height: "50px",
            }}
            className="payment-number"
          >
            2
          </div>
        </div>
        <div
          css={{
            display: "flex",
            marginTop: "20px",
            width: "100%",
            alignItems: "stretch",
            gap: "40px 63px",
          }}
          className="payment-row"
        >
          <div
            css={{
              display: "flex",
              marginTop: "auto",
              marginBottom: "auto",
              alignItems: "start",
              gap: "14px",
              flexGrow: "1",
              flexShrink: "1",
              flexBasis: "auto",
            }}
            className="payment-participants"
          >
            <div
              css={{
                borderRadius: "38px",
                backgroundColor: "rgba(255, 188, 188, 1)",
                display: "flex",
                width: "119px",
                flexShrink: "0",
                height: "37px",
              }}
              className="participant-input"
            />
            <div
              css={{
                borderRadius: "38px",
                backgroundColor: "rgba(255, 188, 188, 1)",
                display: "flex",
                width: "119px",
                flexShrink: "0",
                height: "37px",
              }}
              className="participant-input"
            />
          </div>
          <div
            css={{
              backgroundColor: "rgba(217, 217, 217, 1)",
              borderRadius: "50%",
              paddingLeft: "22px",
              paddingRight: "22px",
              fontFamily:
                "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
              fontSize: "15px",
              color: "rgba(0, 0, 0, 1)",
              fontWeight: "400",
              whiteSpace: "nowrap",
              textAlign: "center",
              width: "50px",
              height: "50px",
            }}
            className="payment-number"
          >
            3
          </div>
        </div>
        <div
          css={{
            borderRadius: "38px",
            backgroundColor: "rgba(200, 198, 198, 0.8)",
            alignSelf: "center",
            marginTop: "110px",
            width: "207px",
            maxWidth: "100%",
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "17px",
            paddingBottom: "17px",
            fontFamily:
              "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
            fontSize: "15px",
            color: "rgba(255, 255, 255, 1)",
            fontWeight: "400",
            textAlign: "center",
          }}
          className="print-button"
        >
          click here to print the slip
        </div>
        <div
          css={{
            color: "rgba(0, 0, 0, 1)",
            fontSize: "20px",
            fontFamily:
              "Rosarivo, -apple-system, Roboto, Helvetica, sans-serif",
            fontWeight: "400",
            textAlign: "center",
            alignSelf: "center",
            marginTop: "58px",
          }}
          className="thank-you-message"
        >
          Thank you for using the service.Have a good day with your friends
        </div>
      </div>
    </div>
  );
}

export default SecondPage;
