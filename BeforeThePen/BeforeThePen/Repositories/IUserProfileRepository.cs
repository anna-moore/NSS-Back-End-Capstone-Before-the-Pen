using BeforeThePen.Models;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);

        List<UserProfile> GetAll();
        UserProfile GetByUserProfileId(int id);
        void Add(UserProfile userProfile);
    }
}