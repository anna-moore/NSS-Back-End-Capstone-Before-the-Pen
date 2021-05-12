using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IMonthlyLayoutRepository
    {
        void AddMonthyLayout(MonthlyLayout monthlyLayout);
        void DeleteMonthlyLayout(int id);
        List<MonthlyLayout> GetMonthlyLayoutByMonthlyId(int monthlyId);
        List<MonthlyLayout> GetMonthlyLayoutsByUser(int userProfileId);
        MonthlyLayout GetMonthlyLayoutById(int Id);
        void UpdateMonthlyLayout(MonthlyLayout monthlyLayout);
    }
}