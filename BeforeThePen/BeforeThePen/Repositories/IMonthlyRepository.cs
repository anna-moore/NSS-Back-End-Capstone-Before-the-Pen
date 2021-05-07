using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IMonthlyRepository
    {
        void AddMonthly(Monthly monthly);
        void DeleteMonthly(int id);
        Monthly GetMonthlyById(int monthlyId);
        List<Monthly> GetMonthlyByUser(int userProfileId);
        void UpdateMonthly(Monthly monthly);
    }
}