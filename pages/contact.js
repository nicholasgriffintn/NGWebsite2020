import Page from '../../components/Page';

const PageContents = () => {
  return (
      <Page
        displayHeader={true}
        loadDrac={true}
        title="Site Moved"
      >
        <div>
          <p>This site has moved to <a href="https://nicholasgriffin.dev">nicholasgriffin.dev</a></p>
        </div>
      </Page>
  );
};

export default PageContents;