// generator/create_og_image.js
// Generates official 1200 x 630 px OpenGraph & Twitter Social Preview Card for BugAgent AI

ObjC.import('AppKit');
ObjC.import('Foundation');

var fm = $.NSFileManager.defaultManager;
var cwdStr = fm.currentDirectoryPath;
var siteDir = fm.fileExistsAtPath(cwdStr.stringByAppendingPathComponent('assets/icon-128.png').js)
  ? cwdStr.js
  : cwdStr.stringByDeletingLastPathComponent.js;
var iconPath = siteDir + '/assets/icon-128.png';
var mockupPath = siteDir + '/assets/user_raw/user-1-new-issue.png';
var outPath = siteDir + '/assets/og-image-1200x630.jpg';

function rgb(r, g, b, a) {
  return $.NSColor.colorWithRedGreenBlueAlpha(r / 255.0, g / 255.0, b / 255.0, (a !== undefined ? a : 1.0));
}

function makeAttrs(font, color, align, shadow) {
  var dict = $.NSMutableDictionary.alloc.init;
  if (font) dict.setObjectForKey(font, $.NSFontAttributeName);
  if (color) dict.setObjectForKey(color, $.NSForegroundColorAttributeName);
  if (align !== undefined) {
    var p = $.NSMutableParagraphStyle.alloc.init;
    p.alignment = align;
    dict.setObjectForKey(p, $.NSParagraphStyleAttributeName);
  }
  if (shadow) dict.setObjectForKey(shadow, $.NSShadowAttributeName);
  return dict;
}

function renderSocialOgImage() {
  var W = 1200;
  var H = 630;
  var canvas = $.NSImage.alloc.initWithSize($.NSMakeSize(W, H));
  canvas.lockFocus;

  // 1. Background Gradient (Deep Atlassian Navy to Jira Blue)
  var c1 = rgb(5, 18, 48);     // Deep Navy #051230
  var c2 = rgb(12, 102, 228);   // Jira Blue #0c66e4
  var bgGrad = $.NSGradient.alloc.initWithStartingColorEndingColor(c1, c2);
  bgGrad.drawInRectAngle($.NSMakeRect(0, 0, W, H), 28.0);

  // 2. Ambient AI Glows
  var glow1 = $.NSBezierPath.bezierPathWithOvalInRect($.NSMakeRect(-80, H - 280, 460, 460));
  rgb(56, 189, 248, 0.16).set; // Cyan glow
  glow1.fill;

  var glow2 = $.NSBezierPath.bezierPathWithOvalInRect($.NSMakeRect(W - 460, -100, 560, 560));
  rgb(168, 85, 247, 0.20).set; // Gemini Purple aura
  glow2.fill;

  var leftX = 70;

  // 3. Central Brand Icon Card
  var iconBoxSize = 78;
  var iconBoxY = H - 135;

  var iconShadow = $.NSShadow.alloc.init;
  iconShadow.shadowColor = rgb(0, 0, 0, 0.40);
  iconShadow.shadowBlurRadius = 20.0;
  iconShadow.shadowOffset = $.NSMakeSize(0, -5);
  iconShadow.set;

  var iconBox = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(
    $.NSMakeRect(leftX, iconBoxY, iconBoxSize, iconBoxSize),
    18, 18
  );
  rgb(255, 255, 255, 1.0).set;
  iconBox.fill;

  $.NSShadow.alloc.init.set; // Reset shadow

  var appIcon = $.NSImage.alloc.initWithContentsOfFile(iconPath);
  if (appIcon) {
    appIcon.drawInRectFromRectOperationFraction(
      $.NSMakeRect(leftX + 8, iconBoxY + 8, iconBoxSize - 16, iconBoxSize - 16),
      $.NSMakeRect(0, 0, 128, 128),
      $.NSCompositingOperationSourceOver,
      1.0
    );
  }

  // 4. Brand Title: "BugAgent AI"
  var titleShadow = $.NSShadow.alloc.init;
  titleShadow.shadowColor = rgb(0, 0, 0, 0.45);
  titleShadow.shadowBlurRadius = 8.0;
  titleShadow.shadowOffset = $.NSMakeSize(0, -3);

  var titleFont = $.NSFont.boldSystemFontOfSize(46.0);
  var titleAttrs = makeAttrs(titleFont, rgb(255, 255, 255), $.NSTextAlignmentLeft, titleShadow);
  var titleStr = $.NSString.stringWithString("BugAgent AI");
  titleStr.drawInRectWithAttributes($.NSMakeRect(leftX, H - 205, 560, 56), titleAttrs);

  // 5. Subtitle: "Autonomous AI QA Agent for Jira"
  var subFont = $.NSFont.boldSystemFontOfSize(20.0);
  var subAttrs = makeAttrs(subFont, rgb(186, 230, 253), $.NSTextAlignmentLeft);
  var subStr = $.NSString.stringWithString("Autonomous AI QA Agent for Jira");
  subStr.drawInRectWithAttributes($.NSMakeRect(leftX, H - 242, 560, 28), subAttrs);

  // 6. Description / Value Proposition
  var descFont = $.NSFont.systemFontOfSize(15.0);
  var descAttrs = makeAttrs(descFont, rgb(226, 232, 240, 0.94), $.NSTextAlignmentLeft);
  var descStr = $.NSString.stringWithString("Turn visual bugs into perfect Jira tickets in seconds.\nAI Vision analysis, auto environment specs & 100% BYOK privacy.");
  descStr.drawInRectWithAttributes($.NSMakeRect(leftX, H - 325, 550, 60), descAttrs);

  // 7. Feature Badges (2x2 Grid)
  var badges = [
    "⚡ 1-Click Bug Capture",
    "🤖 Gemini, GPT, Claude & Ollama",
    "🛡️ 100% BYOK & Zero Telemetry",
    "🐞 Direct Jira Ticket Sync"
  ];

  var bFont = $.NSFont.boldSystemFontOfSize(12.5);
  var bAttrs = makeAttrs(bFont, rgb(255, 255, 255), $.NSTextAlignmentCenter);

  var bW = 255;
  var bH = 38;
  var bY = 110;

  for (var i = 0; i < badges.length; i++) {
    var curX = leftX + (i % 2) * (bW + 14);
    var curY = bY + (1 - Math.floor(i / 2)) * (bH + 12);

    var bRect = $.NSMakeRect(curX, curY, bW, bH);
    var bPath = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(bRect, 19, 19);

    rgb(255, 255, 255, 0.16).set;
    bPath.fill;

    rgb(255, 255, 255, 0.32).set;
    bPath.lineWidth = 1.0;
    bPath.stroke;

    var bStr = $.NSString.stringWithString(badges[i]);
    bStr.drawInRectWithAttributes($.NSMakeRect(curX, curY + 9, bW, bH - 9), bAttrs);
  }

  // 8. Footer Trust Pill
  var footerPillW = 420;
  var footerPillH = 30;
  var footerPillY = 46;
  var footerRect = $.NSMakeRect(leftX, footerPillY, footerPillW, footerPillH);
  var footerPath = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(footerRect, 15, 15);
  rgb(6, 26, 68, 0.55).set;
  footerPath.fill;

  var footerFont = $.NSFont.systemFontOfSize(11.5);
  var footerAttrs = makeAttrs(footerFont, rgb(186, 230, 253), $.NSTextAlignmentCenter);
  var footerStr = $.NSString.stringWithString("★ Chrome Web Store  •  Free Tier Available  •  bugagentai.com");
  footerStr.drawInRectWithAttributes($.NSMakeRect(leftX, footerPillY + 6, footerPillW, footerPillH - 6), footerAttrs);

  // 9. Right Side: Extension Mockup Card with macOS Chrome Top Bar
  var mockupImg = $.NSImage.alloc.initWithContentsOfFile(mockupPath);
  if (mockupImg) {
    var cardW = 430;
    var cardH = 530;
    var cardX = W - cardW - 65;
    var cardY = (H - cardH) / 2;

    // Outer Shadow
    var cardShadow = $.NSShadow.alloc.init;
    cardShadow.shadowColor = rgb(0, 0, 0, 0.55);
    cardShadow.shadowBlurRadius = 36.0;
    cardShadow.shadowOffset = $.NSMakeSize(-6, -10);
    cardShadow.set;

    var cardBox = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(
      $.NSMakeRect(cardX, cardY, cardW, cardH),
      20, 20
    );
    rgb(255, 255, 255, 1.0).set;
    cardBox.fill;

    $.NSShadow.alloc.init.set; // Reset shadow

    // Clip mockup inside card
    var clipPath = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(
      $.NSMakeRect(cardX, cardY, cardW, cardH),
      20, 20
    );
    clipPath.addClip;

    // Draw Mockup Screenshot scaled to fit
    var srcSize = mockupImg.size;
    mockupImg.drawInRectFromRectOperationFraction(
      $.NSMakeRect(cardX, cardY, cardW, cardH),
      $.NSMakeRect(0, 0, srcSize.width, srcSize.height),
      $.NSCompositingOperationSourceOver,
      1.0
    );

    // Subtle 1px inner border
    var innerBorder = $.NSBezierPath.bezierPathWithRoundedRectXRadiusYRadius(
      $.NSMakeRect(cardX + 0.5, cardY + 0.5, cardW - 1, cardH - 1),
      20, 20
    );
    rgb(255, 255, 255, 0.25).set;
    innerBorder.lineWidth = 1.0;
    innerBorder.stroke;
  }

  // 10. Outer Frame Border
  var framePath = $.NSBezierPath.bezierPathWithRect($.NSMakeRect(0.5, 0.5, W - 1, H - 1));
  rgb(255, 255, 255, 0.12).set;
  framePath.lineWidth = 1.0;
  framePath.stroke;

  canvas.unlockFocus;

  // Save as high quality JPEG
  var tiffData = canvas.TIFFRepresentation;
  var bitmap = $.NSBitmapImageRep.imageRepsWithData(tiffData).objectAtIndex(0);
  
  var props = $.NSMutableDictionary.alloc.init;
  props.setObjectForKey($.NSNumber.numberWithFloat(0.96), $.NSImageCompressionFactor);
  
  var jpgData = bitmap.representationUsingTypeProperties(
    $.NSBitmapImageFileTypeJPEG,
    props
  );
  
  jpgData.writeToFileAtomically(outPath, true);
  console.log('✅ Generated 1200x630 Social Preview Card: ' + outPath);
}

renderSocialOgImage();
