import React from 'react';
import { push } from 'connected-react-router';
import { connect, ConnectedProps } from 'react-redux';
import {
  BreadcrumbsDataType,
  BreadcrumbsTypeEnum,
  PELogoWithTitle,
  Wizard,
  Button,
} from 'common';
import { RegistrationTabsEnum } from '../typings/registrationTypes';
import { QuickGuide } from './pages/QuickGuide';
import { BeAware } from './pages/BeAware';
import { RegisterPage } from './pages/loginRegisterAccount/RegisterPage';
import { Backup } from './pages/backup/Backup';
import styles from './Registration.module.scss';
import { RoutesEnum } from '../../application/typings/routes';

const mapDispatchToProps = {
  routeTo: push,
};

const connector = connect(null, mapDispatchToProps);
type RegistrationPageProps = ConnectedProps<typeof connector>;

interface RegistrationPageState {
  enterButtonPressed: boolean;
}

class RegistrationPageComponent extends React.PureComponent<RegistrationPageProps, RegistrationPageState> {
  private registrationBreadcrumbs: BreadcrumbsDataType[] = [
    {
      label: RegistrationTabsEnum.quickGuide,
      component: QuickGuide,
    },
    {
      label: RegistrationTabsEnum.beAware,
      component: BeAware,
    },
    {
      label: RegistrationTabsEnum.loginRegister,
      component: RegisterPage,
    },
    {
      label: RegistrationTabsEnum.backup,
      component: Backup,
    },
  ];

  constructor(props: RegistrationPageProps) {
    super(props);
    this.state = {
      enterButtonPressed: false,
    };
  }

  handleProceedToRegistration = () => {
    this.setState({ enterButtonPressed: true });
  };

  handleProceedToLogin = () => {
    this.props.routeTo(RoutesEnum.login);
  };

  renderWelcome = () => (
    <>
      <div className={styles.registrationTitle}>{'Power Hub'}</div>
      <div className={styles.registrationDesc}>{'home for everyone and every dapp'}</div>
      <div className={styles.buttonsHolder}>
        <Button
          size="large"
          variant="filled"
          className={styles.button}
          type="button"
          onClick={this.handleProceedToRegistration}
        >
          {'Join to Web3'}
        </Button>
        <Button
          size="large"
          variant="outlined"
          className={styles.button}
          type="button"
          onClick={this.handleProceedToLogin}
        >
          {'Login or import an account'}
        </Button>
      </div>
    </>
  );

  renderRegistration = () => (
    <div className={styles.registrationWizardComponent}>
      <PELogoWithTitle className={styles.registrationPageIcon} />
      <div className={styles.registrationWizardHolder}>
        <Wizard
          className={styles.registrationWizard}
          breadcrumbs={this.registrationBreadcrumbs}
          type={BreadcrumbsTypeEnum.direction}
          breadCrumbHasBorder
        />
      </div>
    </div>
  );

  render() {
    const { enterButtonPressed } = this.state;

    return <div className={styles.registrationPage}>
      <div className={styles.registrationPageCover} />
      {enterButtonPressed ? this.renderRegistration() : this.renderWelcome()}
    </div>;
  }
}

export const RegistrationPage = connector(RegistrationPageComponent);
