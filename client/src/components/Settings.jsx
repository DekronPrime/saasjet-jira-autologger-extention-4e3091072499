import React from 'react';
import LoadingButton from '@atlaskit/button/loading-button';
import TextField from '@atlaskit/textfield';
/* import './Popup/index.css'; */
import '../pages/Popup/index.css';

import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';

export const Settings = ({ onFormSubmit }) => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      maxWidth: '100%',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form
      onSubmit={(data) => {
        onFormSubmit(data);
      }}
    >
      {({ formProps, submitting }) => (
        <form {...formProps}>
          <FormHeader title="Sign in" />
          <FormSection>
            <Field
              style={{
                alignItems: 'flex-start',
              }}
              aria-required={true}
              name="url"
              label="Link to your profile"
              isRequired
              defaultValue=""
              validate={(value) => {
                try {
                  new URL(value);
                  return undefined;
                } catch (err) {
                  return 'INCORRECT';
                }
              }}
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <>
                    <TextField autoComplete="off" {...fieldProps} />
                    {error && !valid && (
                      <HelperMessage>
                        Example: https://your-domain.atlassian.net
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>This url is incorrect</ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Great job!</ValidMessage>
                    ) : null}
                  </>
                );
              }}
            </Field>
            <Field
              aria-required={true}
              name="personalAccessToken"
              label="Personal Access Token"
              defaultValue=""
              isRequired
              validate={(value) =>
                value && value.length < 8 ? 'TOO_SHORT' : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <>
                    <TextField autoComplete="off" {...fieldProps} />
                    {error && !valid && (
                      <HelperMessage>
                        You can create it in your Profile Personal Access Tokens
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Personal Access Token needs to be larger
                      </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Great job!</ValidMessage>
                    ) : null}
                  </>
                );
              }}
            </Field>
          </FormSection>
          <FormFooter>
            <LoadingButton
              type="submit"
              appearance="primary"
              isLoading={submitting}
            >
              Sign in
            </LoadingButton>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);
