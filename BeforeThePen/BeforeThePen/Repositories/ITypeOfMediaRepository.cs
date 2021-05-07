using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface ITypeOfMediaRepository
    {
        List<TypeOfMedia> GetAllTypeOfMedia();
    }
}