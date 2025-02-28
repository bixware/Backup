/**
 * App Config File
 */
const AppConfig = {
   appLogo: `${process.env.PUBLIC_URL}/assets/images/img/site-logo.png`,          // App Logo
   brandName: 'Trade Portal',                                    // Brand Name
   navCollapsed: false,                                      // Sidebar collapse
   darkMode: false,                                          // Dark Mode
   boxLayout: false,                                         // Box Layout
   rtlLayout: false,                                         // RTL Layout
   miniSidebar: false,                                       // Mini Sidebar
   enableSidebarBackgroundImage: true,                      // Enable Sidebar Background Image
   sidebarImage: `${process.env.PUBLIC_URL}/assets/images/img/sidebar-4.jpg`,     // Select sidebar image
   isDarkSidenav: true,                                   // Set true to dark sidebar
   enableThemeOptions: true,                              // Enable Theme Options
   locale: {
      languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'en',
   },
   enableUserTour: process.env.NODE_ENV === 'production' ? true : false,  // Enable / Disable User Tour
   copyRightText: 'ABFRL Internaluse by  <a  href="https://www.bixware.com/"  target="_blank" style={{ fontWeight: "bold" }} >  Bixware Technologies  </a>  © 2023. All Rights Reserved',      // Copy Right Text
   // light theme colors
   themeColors: {
      'primary': '#5D92F4',
      'secondary': '#677080',
      'success': '#00D014',
      'danger': '#FF3739',
      'warning': '#FFB70F',
      'info': '#00D0BD',
      'dark': '#464D69',
      'default': '#FAFAFA',
      'greyLighten': '#A5A7B2',
      'grey': '#677080',
      'white': '#FFFFFF',
      'purple': '#896BD6',
      'yellow': '#D46B08'
   },
   // dark theme colors
   darkThemeColors: {
      darkBgColor: '#424242'
   }
}

export default AppConfig;
