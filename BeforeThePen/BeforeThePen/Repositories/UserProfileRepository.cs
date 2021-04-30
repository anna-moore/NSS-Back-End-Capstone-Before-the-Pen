using BeforeThePen.Models;
using Microsoft.Extensions.Configuration;
using BeforeThePen.Utils;
using static BeforeThePen.Utils.DbUtlis;

namespace BeforeThePen.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseId, up.DisplayName, up.FirstName, up.LastName, up.Email, 
                               up.DateCreated, up.ImageURL
                          FROM UserProfile up                             
                         WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageURL = DbUtils.GetString(reader, "ImageURL")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, DisplayName, FirstName, LastName, Email, ImageURL, DateCreated )
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @DisplayName, @FirstName, @LastName, @Email, @ImageURL, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageURL", userProfile.ImageURL);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
