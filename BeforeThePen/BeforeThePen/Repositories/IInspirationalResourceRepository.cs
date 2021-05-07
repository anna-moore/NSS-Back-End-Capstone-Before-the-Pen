using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IInspirationalResourceRepository
    {
        void AddResource(Resource resource);
        void DeleteResource(int id);
        List<Resource> GetResourcesById(int resourceId);
        List<Resource> GetResourcesByUserId(int userProfileId);
        void UpdateResource(Resource resource);
    }
}