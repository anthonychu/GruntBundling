using System.Web;

namespace GruntBundling.Bundling
{
    public static class StaticAssets
    {
        private static StaticAssetResolver assetResolver;

        public static void Initialize (StaticAssetResolver staticAssetResolver)
        {
            if (assetResolver == null)
            {
                assetResolver = staticAssetResolver;
            }
        }

        public static HtmlString RenderScript(string path)
        {
            var actualPath = assetResolver.GetActualPath(path);
            return new HtmlString($"<script src=\"{ actualPath }\"></script>");
        }

        public static HtmlString RenderStyle(string path)
        {
            var actualPath = assetResolver.GetActualPath(path);
            return new HtmlString($"<link href=\"{ actualPath }\" rel=\"stylesheet\" />");
        }
    }
}
