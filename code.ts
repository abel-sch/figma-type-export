// This plugin will export all text styles as JSON.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async (msg: { type: string }) => {
  if (msg.type === 'export-text-styles') {
    const textStyles = await figma.getLocalTextStylesAsync();
    const exportData = textStyles.map(style => ({
      name: style.name,
      fontSize: style.fontSize,
      fontName: style.fontName,
      letterSpacing: style.letterSpacing,
      lineHeight: style.lineHeight,
      paragraphIndent: style.paragraphIndent,
      paragraphSpacing: style.paragraphSpacing,
      textCase: style.textCase,
      textDecoration: style.textDecoration,
    }));

    figma.ui.postMessage({
      type: 'export-data',
      data: JSON.stringify(exportData, null, 2)
    });
  } else if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
