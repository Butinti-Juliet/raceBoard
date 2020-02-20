import { DashBoaPage } from './app.po';

describe('dash-boa App', function() {
  let page: DashBoaPage;

  beforeEach(() => {
    page = new DashBoaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
