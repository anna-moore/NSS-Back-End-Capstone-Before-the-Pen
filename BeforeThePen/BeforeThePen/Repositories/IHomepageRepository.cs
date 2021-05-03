using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IHomepageRepository
    {
        Spotlight GetCurrentSpotlight();
        List<HomepageResource> GetHomepageResources();
    }
}