import Script from 'next/script';
import React from 'react'

export const Epayco = () => {
  

  return (
    <form>
      <Script
        src={process.env.NEXT_PUBLIC_EPAYCO_CHECKOUT_URL}
        data-epayco-key={process.env.NEXT_PUBLIC_EPAYCO_KEY}
        data-epayco-private-key={process.env.NEXT_PUBLIC_EPAYCO_PRIVATE_KEY}
        className="epayco-button"
        data-epayco-invoice="9fd54fe2-1549-4afd-a3fe-a018b94b4492"
        data-epayco-amount="190000"
        data-epayco-tax="0.00"
        data-epayco-tax-ico="0.00"
        data-epayco-tax-base="190000"
        data-epayco-name="Test"
        data-epayco-description="IPhone 13 Pro 128GB"
        data-epayco-currency="cop"
        data-epayco-country="CO"
        data-epayco-test="true"
        data-epayco-external="false"
        data-epayco-response={process.env.NEXT_PUBLIC_PAYCO_RESPONSE_URL}
        data-epayco-confirmation={
          process.env.NEXT_PUBLIC_PAYCO_CONFIRMATION_URL
        }
        data-epayco-button="https://multimedia.epayco.co/dashboard/btns/btn3.png"
        data-epayco-methodconfirmation="get"
        data-epayco-type-doc-billing={"CC"}
        data-epayco-number-doc-billing={123456789}
        data-epayco-name-billing={"Cristian" + " " + "Martinez"}
        data-epayco-mobilephone-billing={3054873225}
      />
    </form>
  );
}
