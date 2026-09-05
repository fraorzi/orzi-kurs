"use client";

import { useState } from "react";
import { getCustomerSummary } from "./lib/customer-data";
import type { CustomerSummary } from "./types";

export function CustomerPanel({
  customer,
}: {
  customer: CustomerSummary;
}) {
  void getCustomerSummary;
  const [detailsVisible, setDetailsVisible] =
    useState(false);

  return (
    <section>
      <h1>{customer.name}</h1>
      <button
        type="button"
        onClick={() => setDetailsVisible((value) => !value)}
      >
        {detailsVisible ? "Ukryj kontakt" : "Pokaż kontakt"}
      </button>
      {detailsVisible && <p>{customer.email}</p>}
    </section>
  );
}
