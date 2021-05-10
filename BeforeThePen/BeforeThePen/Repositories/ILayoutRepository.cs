using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface ILayoutRepository
    {
        void AddLayout(Layout layout);
        void DeleteLayout(int id);
        Layout GetLayoutById(int layoutId);
        List<Layout> GetLayoutsByUser(int userProfileId);
        void UpdateLayout(Layout layout);
    }
}