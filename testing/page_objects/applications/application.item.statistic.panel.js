const Page = require('../page');
const appConst = require('../../libs/app_const');

const xpath = {
    main: `//div[contains(@id,'ApplicationItemStatisticsPanel')]`,
    title: `//div[contains(@id,'ItemStatisticsHeader')]/h1[contains(@class,'title')]`,
    dropDownButton: `//div[contains(@id,'ActionMenu')]//div[contains(@class,'drop-down-button')]`,
    dataContainer: `//div[contains(@class,'application-data-container')]`,
    siteItemDataGroup: `//div[contains(@id,'ItemDataGroup') and child::h2[text()='Site']]`,
    applicationItemDataGroup: `//div[contains(@id,'ItemDataGroup') and child::h2[text()='Application']]`,
    contentTypes: `//ul[@class='data-list' and descendant::li[text()='Content Types']]//span`,
    applicationDataHeaders: `//li[@class='list-header']`,
    idProviderApplicationsHeaders: `//div[contains(@id,'ItemDataGroup') and descendant::h2[text()='ID Provider Applications']]//li[@class='list-header']`,
    stopActionMenuItem: `//div[contains(@id,'ActionMenu')]//li[contains(@id,'ActionMenuItem') and text()='Stop']`,
    startActionMenuItem: `//div[contains(@id,'ActionMenu')]//li[contains(@id,'ActionMenuItem') and text()='Start']`,
    siteDataHeaders: `//div[contains(@id,'ApplicationItemStatisticsPanel')]/div[contains(@class,'application-data-container')]/div[contains(@class,'site')]//li[contains(@class,'list-header')]`,
};
class ApplicationItemStatisticsPanel extends Page {

    //Site data-group, content types list
    get contentTypes() {
        return xpath.main + xpath.dataContainer + xpath.siteItemDataGroup + xpath.contentTypes;
    }

    //Application data-group(Installed,Version,Key,System Required)
    getApplicationDataHeaders() {
        let selector = xpath.main + xpath.dataContainer + xpath.applicationItemDataGroup + xpath.applicationDataHeaders;
        return this.getTextInElements(selector).catch(err => {
            throw new Error('Error while getting application-data-headers: ' + err);
        })
    }

    //return the application's name
    getApplicationName() {
        return this.getText(xpath.title);
    }

    //return list of names of content types
    getContentTypes() {
        return this.getTextInElements(this.contentTypes).catch(err => {
            throw new Error('error while getting Content Types: ' + err);
        })
    }

    getProviderDataHeaders() {
        return this.getText(xpath.idProviderApplicationsHeaders);
    }

    // Expected list of headers: Content Types, Page, Part, Layout,Relationship Types
    getSiteDataHeaders() {
        return this.getTextInElements(xpath.siteDataHeaders);
    }

    clickOnStopActionMenuItem() {
        return this.clickOnElement(xpath.stopActionMenuItem).catch(err => {
            throw new Error("Error when clicking on Stop menu item");
        })
    }

    clickOnStartActionMenuItem() {
        return this.clickOnElement(xpath.startActionMenuItem).catch(err => {
            throw new Error("Error when clicking on Start menu item");
        })
    }

    getDropDownButtonText() {
        let selector = xpath.main + xpath.dropDownButton;
        return this.getText(selector).catch(err => {
            throw new Error('error while getting text from the button: ' + err);
        })
    }

    waitForApplicationStatus(state) {
        let selector = xpath.main + xpath.dropDownButton;
        return this.getBrowser().waitUntil(() => {
            return this.getText(selector).then(text => {
                return text === state;
            });
        }, 3000, "Expected sate should be " + state);
    }

    clickOnActionDropDownMenu() {
        let selector = xpath.main + xpath.dropDownButton;
        return this.clickOnElement(selector).catch(err => {
            throw new Error('error when clicking on action menu: ' + err);
        })
    }

    waitForStopMenuItemVisible() {
        return this.waitForElementDisplayed(xpath.stopActionMenuItem, appConst.TIMEOUT_2).catch(err => {
            this.saveScreenshot("stop_menu_item_not_visible");
            return false;
        })
    }

    waitForStartMenuItemVisible() {
        return this.waitForElementDisplayed(xpath.startActionMenuItem, appConst.TIMEOUT_2).catch(err => {
            this.saveScreenshot("stop_menu_item_not_visible");
            return false;
        })
    }
};
module.exports = ApplicationItemStatisticsPanel;
