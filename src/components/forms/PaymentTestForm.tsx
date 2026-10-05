'use client';

import { FormEvent, useState } from 'react';
// import { Alert, AlertMsgProps } from '@/components/.ui/Alert';
import { Button } from '@/components/.ui/Button';
import { TextField } from '@/components/.ui/TextField';

interface PaymentFormData {
  serviceName: string;
  serviceDescription: string;
  servicePrice: string;
}

interface PaymentFieldErrors {
  serviceName?: string;
  serviceDescription?: string;
  servicePrice?: string;
}

interface PaymentApiSuccessResponse {
  sessionId: string;
  checkoutUrl: string | null;
}

const initialFormData: PaymentFormData = {
  serviceName: 'Test Service',
  serviceDescription: 'Test Service Description',
  servicePrice: '10.00',
};

export const PaymentTestForm = () => {
  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<PaymentFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // const [alertMsg, setAlertMsg] = useState<AlertMsgProps | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors: PaymentFieldErrors = {};
    const parsedPrice = Number(formData.servicePrice);

    if (!formData.serviceName.trim()) {
      errors.serviceName = 'Service name is required';
    }

    if (!formData.serviceDescription.trim()) {
      errors.serviceDescription = 'Service description is required';
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      errors.servicePrice = 'Service price must be a number greater than 0';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setAlertMsg(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('serviceName', formData.serviceName);
      payload.append('serviceDescription', formData.serviceDescription);
      payload.append('servicePrice', formData.servicePrice);

      const response = await fetch('/api/payment/stripe', {
        method: 'POST',
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data?.error || 'Failed to create checkout session.';
        // setAlertMsg({ message, type: 'error' });
        return;
      }

      const successData = data as PaymentApiSuccessResponse;

      if (!successData.checkoutUrl) {
        // setAlertMsg({ message: 'Checkout session was created but no redirect URL was returned.', type: 'error' });
        return;
      }

      // setAlertMsg({ message: `Checkout session ${successData.sessionId} created. Redirecting...`, type: 'success' });
      window.location.assign(successData.checkoutUrl);
    } catch {
      // setAlertMsg({ message: 'Unexpected error while creating checkout session.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container section-container payment-test-section">
      <div className="form-header">
        <h3>Test Payment</h3>
        {/* {alertMsg && (
          <Alert type={alertMsg.type} className="transparent no-margin no-padding">
            {alertMsg.message}
          </Alert>
        )} */}
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Service Name*"
          name="serviceName"
          initialValue={formData.serviceName}
          onChange={handleChange}
          errorMsg={fieldErrors.serviceName}
          disabled={submitting}
        />
        <TextField
          label="Service Description*"
          name="serviceDescription"
          initialValue={formData.serviceDescription}
          onChange={handleChange}
          errorMsg={fieldErrors.serviceDescription}
          disabled={submitting}
          multiline
          rows={3}
        />
        <TextField
          label="Service Price (USD)*"
          name="servicePrice"
          initialValue={formData.servicePrice}
          onChange={handleChange}
          errorMsg={fieldErrors.servicePrice}
          disabled={submitting}
          type="number"
        />
        <div className="btn-container">
          <Button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Creating Session...' : 'Create Test Payment'}
          </Button>
        </div>
      </form>
    </div>
  );
};
