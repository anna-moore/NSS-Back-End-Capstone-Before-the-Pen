﻿using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IMonthlyLayoutRepository
    {
        void AddMonthyLayout(MonthlyLayout monthlyLayout);
        void DeleteMonthlyLayout(int id);
        MonthlyLayout GetMonthlyLayoutById(int monthlyId);
        List<MonthlyLayout> GetMonthlyLayoutsByUser(int id, int MonthlyId);
        void UpdateMonthlyLayout(MonthlyLayout monthlyLayout);
    }
}