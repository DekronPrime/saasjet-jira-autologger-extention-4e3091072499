import React from 'react';

import ButtonGroup from '@atlaskit/button/button-group';
import LoadingButton from '@atlaskit/button/loading-button';
import Button from '@atlaskit/button/standard-button';
import TextField from '@atlaskit/textfield';

import Form, {
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  ValidMessage,
} from '@atlaskit/form';

export const Login = ({ onFormSubmit }) => (
  <div >
    <Form
      onSubmit={(data) => {
        console.log('form data', data);
        onFormSubmit(data);
      }}
    >
    {({ formProps, submitting }) => (
      <form {...formProps}>
        <FormHeader
          title="Sign in"
          description="* indicates a required field"
        />
        <FormSection>
          <Field
            aria-required={true}
            name="url"
            label="Link to your profile"
            isRequired
            defaultValue=""
            validate={(value) => {
              try {
                new URL(value);
                return true;
              } catch (err) {
                return false;
              }
            }}
          >
            {({ fieldProps, error, valid }) => (
              <>
                <TextField autoComplete="off" {...fieldProps} />
                {error && !valid && (
                  <HelperMessage>
                    https://your-domain.atlassian.net
                  </HelperMessage>
                )}
                {error && !valid (
                  <ErrorMessage>
                    This url is incorrect
                  </ErrorMessage>
                )}
              </>
            )}
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
                  <TextField type="password" {...fieldProps} />
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
          <ButtonGroup>
            <Button appearance="subtle">Cancel</Button>
            <LoadingButton
              type="submit"
              appearance="primary"
              isLoading={submitting}
            >
              Sign in
            </LoadingButton>
          </ButtonGroup>
        </FormFooter>
      </form>
    )}
  </Form>
</div>
);
