import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Sidebar } from '@puppet/react-components';

const propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
};

const AppSidebar = ({ t, location: { pathname } }) => (
  <Sidebar>
    <Sidebar.Header logo="Product" as={Link} to="/" />
    <Sidebar.Navigation>
      <Sidebar.Section label={t('sections.pages')}>
        <Sidebar.Item
          title={t('pages.home')}
          icon="home"
          active={pathname === '/'}
          as={Link}
          to="/"
        />
      </Sidebar.Section>
      <Sidebar.Section label={t('sections.actions')}>
        <Sidebar.Item
          title={t('actions.export')}
          icon="pdf"
          onClick={() => {}}
        />
      </Sidebar.Section>
    </Sidebar.Navigation>
    <Sidebar.Footer username="Lorem Ipsum" version="1969.7.20" />
  </Sidebar>
);

AppSidebar.propTypes = propTypes;

export default AppSidebar;