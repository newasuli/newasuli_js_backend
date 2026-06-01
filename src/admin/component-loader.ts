import { ComponentLoader, Dashboard } from 'adminjs';

const componentLoader = new ComponentLoader();

const components= {
    Dashboard: componentLoader.add('Dashboard', '../components/CustomDashboard'),
    CustomGalleryUploadComponent: componentLoader.add('CustomGalleryUploadComponent', '../components/CustomGalleryUploadComponent'),
    CustomShow: componentLoader.add('CustomShow', '../components/CustomShow'),
    RandomPicture: componentLoader.add('RandomPicture', '../components/RandomPicture'),
    CustomImageUploadComponent: componentLoader.add('CustomImageUploadComponent', '../components/CustomImageUploadComponent'),
    CustomPopupUploadComponent: componentLoader.add('CustomPopupUploadComponent', '../components/CustomPopupUploadComponent'),
    CustomPasswordComponent: componentLoader.add('CustomPasswordEditComponent', '../components/CustomAdminPasswordComponent'),
}

export { componentLoader, components };
