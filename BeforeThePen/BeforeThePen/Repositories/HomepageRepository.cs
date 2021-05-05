using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeforeThePen.Models;
using static BeforeThePen.Utils.DbUtlis;
using Microsoft.Data.SqlClient;

namespace BeforeThePen.Repositories
{
    public class HomepageRepository : BaseRepository, IHomepageRepository
    {
        public HomepageRepository(IConfiguration configuration) : base(configuration) { }

        //gather the spotlight of the month 
        public Spotlight GetCurrentSpotlight()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" 
                                        SELECT id, artist, youtubeEmbedId, artistPortfolioURL, ImageURL, About
                                        FROM SpotlightLayout
                                        WHERE CurrentMonth = 1";

                    var reader = cmd.ExecuteReader();
                    Spotlight spotlight = null;

                    if (reader.Read())
                    {   
                        spotlight = new Spotlight()
                        {
                            Id = DbUtils.GetInt(reader, "id"),
                            Artist = DbUtils.GetString(reader, "artist"),
                            YoutubeEmbedId = DbUtils.GetString(reader, "youtubeEmbedId"),
                            ArtistPortfolioURL = DbUtils.GetString(reader, "artistPortfolioURL"),
                            ImageURL = DbUtils.GetString(reader, "ImageURL"),
                            About = DbUtils.GetString(reader, "About")
                        };
                    }

                    reader.Close();
                    return spotlight;
                }
            }

        }

        //gather the list of helpful links that are displayed on the homepage
        public List<HomepageResource> GetHomepageResources()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT Id, Topic, URL
                                        FROM HomepageResources";
                    var reader = cmd.ExecuteReader();
                    var helpfulResources = new List<HomepageResource>();
                    while (reader.Read())
                    {
                        helpfulResources.Add(NewLinksFromDb(reader));
                    }
                    reader.Close();
                    return helpfulResources;
                }
            }
        }

        //helper function
        private HomepageResource NewLinksFromDb(SqlDataReader reader)
        {
            return new HomepageResource()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Topic = DbUtils.GetString(reader, "Topic"),
                URL = DbUtils.GetString(reader, "URL")
            };

        }
    }
}
