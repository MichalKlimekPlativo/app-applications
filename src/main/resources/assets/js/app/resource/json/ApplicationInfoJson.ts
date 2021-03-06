import {ContentReferencesJson} from './ContentReferencesJson';
import {ApplicationDeployment} from './ApplicationDeployment';
import {ApplicationTasksJson} from './ApplicationTasksJson';
import {IdProviderApplicationJson} from './IdProviderApplicationJson';
import {WidgetDescriptorsJson} from './WidgetDescriptorsJson';
import {RelationshipTypeListJson} from '../../relationshiptype/RelationshipTypeListJson';
import ContentTypeSummaryListJson = api.schema.content.ContentTypeSummaryListJson;
import PageDescriptorsJson = api.content.page.PageDescriptorsJson;
import PartDescriptorsJson = api.content.page.region.PartDescriptorsJson;
import LayoutDescriptorsJson = api.content.page.region.LayoutDescriptorsJson;
import AdminToolDescriptorsJson = api.content.json.AdminToolDescriptorsJson;
import MacrosJson = api.macro.resource.MacrosJson;

export interface ApplicationInfoJson {

    contentTypes: ContentTypeSummaryListJson;

    pages: PageDescriptorsJson;

    parts: PartDescriptorsJson;

    layouts: LayoutDescriptorsJson;

    relations: RelationshipTypeListJson;

    macros: MacrosJson;

    references: ContentReferencesJson;

    tasks: ApplicationTasksJson;

    idProviderApplication: IdProviderApplicationJson;

    deployment: ApplicationDeployment;

    widgets: WidgetDescriptorsJson;

    tools: AdminToolDescriptorsJson;

}
