using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Caching;

namespace GruntBundling.Bundling
{
    public static class StaticAssets
    {
        private static StaticAssetResolver assetResolver;

        public static void Initialize (string assetsJsonPath, Cache cache)
        {
            if (assetResolver == null)
            {
                assetResolver = new StaticAssetResolver(assetsJsonPath, cache);
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
