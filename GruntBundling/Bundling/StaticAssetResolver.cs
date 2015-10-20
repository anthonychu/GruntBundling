using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;
using System.Web.Caching;
using System.Diagnostics;

namespace GruntBundling.Bundling
{
    class StaticAssetResolver
    {
        private string assetsJsonPath;
        private Cache cache;

        private const string CACHE_KEY = "assetsJsonDictionary";

        public StaticAssetResolver(string assetsJsonPath, Cache cache)
        {
            this.assetsJsonPath = assetsJsonPath;
            this.cache = cache;
        }

        public string GetActualPath(string assetPath)
        {
            var assets = cache.Get(CACHE_KEY) as AssetCollection;
            if (assets == null)
            {
                assets = GetAssetsFromFile();
                cache.Insert(CACHE_KEY, assets, new CacheDependency(assetsJsonPath));
                Trace.TraceInformation("Assets cache miss");
            }
            else
            {
                Trace.TraceInformation("Assets cache hit");
            }
            return assets[assetPath];
        }

        private AssetCollection GetAssetsFromFile()
        {
            return JsonConvert.DeserializeObject<AssetCollection>(File.ReadAllText(assetsJsonPath));
        }
    }
}
