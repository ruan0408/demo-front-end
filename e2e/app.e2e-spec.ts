import { FrontDemoPage } from './app.po';

describe('front-demo App', function() {
  let page: FrontDemoPage;

  beforeEach(() => {
    page = new FrontDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
