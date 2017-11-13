﻿#pragma checksum "..\..\BrowserFix.xaml" "{406ea660-64cf-4c82-b6f0-42d48172a799}" "CE91B5C3EFF6866DFDC435CA51C23863"
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

using EO.TabbedBrowser;
using EO.WebBrowser.Wpf;
using EO.Wpf;
using EO.Wpf.Gauge;
using EO.Wpf.Gauge.Shapes;
using EO.Wpf.Primitives;
using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Automation;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Markup;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Effects;
using System.Windows.Media.Imaging;
using System.Windows.Media.Media3D;
using System.Windows.Media.TextFormatting;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Shell;


namespace EO.TabbedBrowser {
    
    
    /// <summary>
    /// BrowserFix
    /// </summary>
    public partial class BrowserFix : System.Windows.Window, System.Windows.Markup.IComponentConnector, System.Windows.Markup.IStyleConnector {
        
        
        #line 128 "..\..\BrowserFix.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal EO.Wpf.WindowChrome wic_windowChrome;
        
        #line default
        #line hidden
        
        
        #line 162 "..\..\BrowserFix.xaml"
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1823:AvoidUnusedPrivateFields")]
        internal EO.Wpf.TabControl mainTabs;
        
        #line default
        #line hidden
        
        private bool _contentLoaded;
        
        /// <summary>
        /// InitializeComponent
        /// </summary>
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        public void InitializeComponent() {
            if (_contentLoaded) {
                return;
            }
            _contentLoaded = true;
            System.Uri resourceLocater = new System.Uri("/WEBTracer;component/browserfix.xaml", System.UriKind.Relative);
            
            #line 1 "..\..\BrowserFix.xaml"
            System.Windows.Application.LoadComponent(this, resourceLocater);
            
            #line default
            #line hidden
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        void System.Windows.Markup.IComponentConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 1:
            
            #line 8 "..\..\BrowserFix.xaml"
            ((EO.TabbedBrowser.BrowserFix)(target)).Loaded += new System.Windows.RoutedEventHandler(this.Window_Loaded);
            
            #line default
            #line hidden
            
            #line 8 "..\..\BrowserFix.xaml"
            ((EO.TabbedBrowser.BrowserFix)(target)).Closing += new System.ComponentModel.CancelEventHandler(this.Window_Closing);
            
            #line default
            #line hidden
            
            #line 8 "..\..\BrowserFix.xaml"
            ((EO.TabbedBrowser.BrowserFix)(target)).PreviewMouseLeftButtonDown += new System.Windows.Input.MouseButtonEventHandler(this.win_main_PreviewMouseLeftButtonDown);
            
            #line default
            #line hidden
            
            #line 8 "..\..\BrowserFix.xaml"
            ((EO.TabbedBrowser.BrowserFix)(target)).ContentRendered += new System.EventHandler(this.win_main_ContentRendered);
            
            #line default
            #line hidden
            return;
            case 2:
            this.wic_windowChrome = ((EO.Wpf.WindowChrome)(target));
            return;
            case 3:
            this.mainTabs = ((EO.Wpf.TabControl)(target));
            
            #line 164 "..\..\BrowserFix.xaml"
            this.mainTabs.NewItemRequested += new EO.Wpf.NewItemRequestedEventHandler(this.mainTabs_NewItemRequested);
            
            #line default
            #line hidden
            
            #line 164 "..\..\BrowserFix.xaml"
            this.mainTabs.SelectionChanged += new System.Windows.Controls.SelectionChangedEventHandler(this.mainTabs_SelectionChanged);
            
            #line default
            #line hidden
            
            #line 164 "..\..\BrowserFix.xaml"
            this.mainTabs.PreviewItemClose += new EO.Wpf.TabItemCloseEventHandler(this.mainTabs_PreviewItemClose);
            
            #line default
            #line hidden
            
            #line 164 "..\..\BrowserFix.xaml"
            this.mainTabs.MouseMove += new System.Windows.Input.MouseEventHandler(this.mainTabs_MouseMove);
            
            #line default
            #line hidden
            
            #line 164 "..\..\BrowserFix.xaml"
            this.mainTabs.MouseLeftButtonDown += new System.Windows.Input.MouseButtonEventHandler(this.mainTabs_MouseLeftButtonDown);
            
            #line default
            #line hidden
            return;
            }
            this._contentLoaded = true;
        }
        
        [System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [System.CodeDom.Compiler.GeneratedCodeAttribute("PresentationBuildTasks", "4.0.0.0")]
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Never)]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Design", "CA1033:InterfaceMethodsShouldBeCallableByChildTypes")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1800:DoNotCastUnnecessarily")]
        [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Maintainability", "CA1502:AvoidExcessiveComplexity")]
        void System.Windows.Markup.IStyleConnector.Connect(int connectionId, object target) {
            switch (connectionId)
            {
            case 4:
            
            #line 194 "..\..\BrowserFix.xaml"
            ((EO.Wpf.BareButton)(target)).Click += new System.Windows.RoutedEventHandler(this.btnGoBack_Click);
            
            #line default
            #line hidden
            break;
            case 5:
            
            #line 205 "..\..\BrowserFix.xaml"
            ((EO.Wpf.BareButton)(target)).Click += new System.Windows.RoutedEventHandler(this.btnGoForward_Click);
            
            #line default
            #line hidden
            break;
            case 6:
            
            #line 216 "..\..\BrowserFix.xaml"
            ((EO.Wpf.BareButton)(target)).Click += new System.Windows.RoutedEventHandler(this.btnReload_Click);
            
            #line default
            #line hidden
            break;
            case 7:
            
            #line 228 "..\..\BrowserFix.xaml"
            ((System.Windows.Controls.TextBox)(target)).PreviewKeyDown += new System.Windows.Input.KeyEventHandler(this.txtUrl_PreviewKeyDown);
            
            #line default
            #line hidden
            
            #line 228 "..\..\BrowserFix.xaml"
            ((System.Windows.Controls.TextBox)(target)).GotFocus += new System.Windows.RoutedEventHandler(this.txtUrl_GotFocus);
            
            #line default
            #line hidden
            
            #line 228 "..\..\BrowserFix.xaml"
            ((System.Windows.Controls.TextBox)(target)).PreviewMouseDown += new System.Windows.Input.MouseButtonEventHandler(this.txtUrl_PreviewMouseDown);
            
            #line default
            #line hidden
            break;
            case 8:
            
            #line 256 "..\..\BrowserFix.xaml"
            ((EO.Wpf.DropDown)(target)).Opened += new System.Windows.RoutedEventHandler(this.Menu_Opened);
            
            #line default
            #line hidden
            break;
            case 9:
            
            #line 258 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuDownloads_Click);
            
            #line default
            #line hidden
            break;
            case 10:
            
            #line 259 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuConsole_Click);
            
            #line default
            #line hidden
            break;
            case 11:
            
            #line 260 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuObjects_Click);
            
            #line default
            #line hidden
            break;
            case 12:
            
            #line 261 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuDevTools_Click);
            
            #line default
            #line hidden
            break;
            case 13:
            
            #line 263 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuEmbeddedPage_Click);
            
            #line default
            #line hidden
            break;
            case 14:
            
            #line 264 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuJSFunction_Click);
            
            #line default
            #line hidden
            break;
            case 15:
            
            #line 266 "..\..\BrowserFix.xaml"
            ((EO.Wpf.MenuItem)(target)).Click += new System.Windows.RoutedEventHandler(this.mnuAbout_Click);
            
            #line default
            #line hidden
            break;
            case 16:
            
            #line 285 "..\..\BrowserFix.xaml"
            ((EO.Wpf.DockContainer)(target)).DockViewNeeded += new EO.Wpf.DockViewNeededEventHandler(this.dockContainer_DockViewNeeded);
            
            #line default
            #line hidden
            
            #line 286 "..\..\BrowserFix.xaml"
            ((EO.Wpf.DockContainer)(target)).DockItemNeeded += new EO.Wpf.DockItemNeededEventHandler(this.dockContainer_DockItemNeeded);
            
            #line default
            #line hidden
            
            #line 287 "..\..\BrowserFix.xaml"
            ((EO.Wpf.DockContainer)(target)).DockViewAdded += new EO.Wpf.DockViewEventHandler(this.dockContainer_DockViewAdded);
            
            #line default
            #line hidden
            break;
            }
        }
    }
}

